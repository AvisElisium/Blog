using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Application.Services;

/// <summary>
/// Service class for interacting with users
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Method for checking if given email is already taken
    /// </summary>
    /// <param name="email">Email to be checked</param>
    /// <param name="cancellationToken"><see cref="CancellationToken"/></param>
    /// <returns></returns>
    Task<bool> IsUniqueEmailAsync(string email, CancellationToken cancellationToken);
    /// <summary>
    /// Method for checking if given username is already taken
    /// </summary>
    /// <param name="username">Username to be checked</param>
    /// <param name="cancellationToken"><see cref="CancellationToken"/></param>
    /// <returns></returns>
    Task<bool> IsUniqueUsernameAsync(string username, CancellationToken cancellationToken);
    /// <summary>
    /// Gets current logged in user's username, works only in [Authorize]d context
    /// </summary>
    /// <returns></returns>
    string GetCurrentUserUsername();
    /// <summary>
    /// Class for authorizing actions depending on resource
    /// </summary>
    /// <param name="resource">Resource</param>
    /// <param name="operation"><see cref="Operations"/></param>
    /// <typeparam name="T">type of resource</typeparam>
    /// <returns></returns>
    Task<bool> AuthorizeUserAsync<T>(T resource, OperationAuthorizationRequirement operation);
}