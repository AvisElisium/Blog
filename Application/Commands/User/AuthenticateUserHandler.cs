using Application.Exceptions;
using Application.Models.User;
using Application.Services;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.User;

public class AuthenticateUserHandler : IRequestHandler<AuthenticateUser, UserDto>
{
    private readonly UserManager<Domain.Entities.User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthenticateUserHandler(UserManager<Domain.Entities.User> userManager,
        ITokenService tokenService, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task<UserDto> Handle(AuthenticateUser request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .Include(x => x.RefreshTokens)
            .FirstOrDefaultAsync(x => x.UserName == request.Dto.Username, cancellationToken);

        if (user is null) throw new NotFoundException($"User with username {request.Dto.Username} does not exist");

        var result = await _userManager.CheckPasswordAsync(user, request.Dto.Password);

        if (result is false) throw new NotFoundException("User with this Username and password combination was not found");

        if (!user.RefreshTokens.Any(x => x.IsActive))
        {
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);
            _httpContextAccessor.HttpContext!.Response.Cookies.Append("refreshToken", refreshToken.Value, new CookieOptions()
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Domain = "localhost",
                Path = "/",
            });
        }

        var userDto = _mapper.Map<Domain.Entities.User, UserDto>(user);

        userDto.JwtToken = _tokenService.CreateJwt(user);
        
        return userDto;
    }
}