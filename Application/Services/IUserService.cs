using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Application.Services;

public interface IUserService
{
    Task<bool> IsUniqueEmailAsync(string email, CancellationToken cancellationToken);
    Task<bool> IsUniqueUsernameAsync(string username, CancellationToken cancellationToken);
    string GetCurrentUserUsername();
    Task<bool> AuthorizeUserAsync<T>(T resource, OperationAuthorizationRequirement operation);
}