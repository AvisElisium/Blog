using Domain.Entities;

namespace Application.Services;

/// <summary>
/// Service class for token actions
/// </summary>
public interface ITokenService
{
    /// <summary>
    /// Method for creating JWT token
    /// </summary>
    /// <param name="user">User for which token is to be created</param>
    /// <returns></returns>
    string CreateJwt(User user);
    /// <summary>
    /// Method for generating refresh token
    /// </summary>
    /// <returns></returns>
    RefreshToken GenerateRefreshToken();
}