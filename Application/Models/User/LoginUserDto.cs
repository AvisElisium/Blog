namespace Application.Models.User;

/// <summary>
/// Dto for logging in
/// </summary>
public class LoginUserDto
{
    /// <summary>
    /// Username
    /// </summary>
    public string Username { get; set; }
    /// <summary>
    /// Password
    /// </summary>
    public string Password { get; set; }
}