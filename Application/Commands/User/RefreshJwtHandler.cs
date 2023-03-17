using Application.Exceptions;
using Application.Models.User;
using Application.Services;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.User;

public class RefreshJwtHandler : IRequestHandler<RefreshJwt, UserDto>
{
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;
    private readonly UserManager<Domain.Entities.User> _userManager;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RefreshJwtHandler(ITokenService tokenService, IUserService userService, UserManager<Domain.Entities.User> userManager,
        IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _tokenService = tokenService;
        _userService = userService;
        _userManager = userManager;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task<UserDto> Handle(RefreshJwt request, CancellationToken cancellationToken)
    {
        var username = _userService.GetCurrentUserUsername();
        var refreshToken = _httpContextAccessor.HttpContext!.Request.Cookies["refreshToken"];

        var user = await _userManager.Users
            .Include(x => x.RefreshTokens)
            .FirstOrDefaultAsync(x => x.UserName == username, cancellationToken);

        if (user is null || refreshToken is null) throw new UnauthorizedException();

        var token = user.RefreshTokens.FirstOrDefault(x => x.Value == refreshToken);

        if (token is null) throw new UnauthorizedException();
        
        if (token.IsActive)
        {
            token.ExpiresAt = DateTime.UtcNow.AddDays(7);
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", token.Value, new CookieOptions()
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7),
            });
            
            await _userManager.UpdateAsync(user);
            
            var dto = _mapper.Map<Domain.Entities.User, UserDto>(user);
            dto.JwtToken = _tokenService.CreateJwt(user);

            return dto;
        }

        throw new UnauthorizedException();
    }
}