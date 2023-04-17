namespace Application.Models.User;

/// <summary>
/// Dto for User entity
/// </summary>
public class UserDto
{
    /// <summary>
    /// Username
    /// </summary>
    public string Username { get; set; }
    /// <summary>
    /// JWT token
    /// </summary>
    public string JwtToken { get; set; }
    /// <summary>
    /// User IsAdmin
    /// </summary>
    public bool IsAdmin { get; set; }
    /// <summary>
    /// User IsAuthor
    /// </summary>
    public bool IsAuthor { get; set; }
    /// <summary>
    /// Uri to User's ProfilePicture
    /// </summary>
    public Uri ProfilePicture { get; set; }
}