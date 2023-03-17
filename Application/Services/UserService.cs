using System.Security.Claims;
using Application.Exceptions;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IAuthorizationService _authorizationService;

    public UserService(AppDbContext context, IHttpContextAccessor contextAccessor, IAuthorizationService authorizationService)
    {
        _context = context;
        _contextAccessor = contextAccessor;
        _authorizationService = authorizationService;
    }
    
    public async Task<bool> IsUniqueEmailAsync(string email, CancellationToken cancellationToken)
    {
        var taken = await _context.Users.AnyAsync(x => x.Email == email, cancellationToken);
        return !taken;
    }

    public async Task<bool> IsUniqueUsernameAsync(string username, CancellationToken cancellationToken)
    {
        var taken = await _context.Users.AnyAsync(x => x.UserName == username, cancellationToken);
        return !taken;
    }

    public string GetCurrentUserUsername()
    {
        return GetCurrentUserClaimsPrincipal().FindFirstValue(ClaimTypes.Name) ?? throw new UnauthorizedException();
    }

    private ClaimsPrincipal GetCurrentUserClaimsPrincipal()
    {
        return _contextAccessor.HttpContext?.User ?? throw new UnauthorizedException();
    }

    public async Task<bool> AuthorizeUserAsync<T>(T resource, OperationAuthorizationRequirement operation)
    {
        var user = GetCurrentUserClaimsPrincipal();
        var result = await _authorizationService.AuthorizeAsync(user, resource, operation);

        return result.Succeeded;
    }
}