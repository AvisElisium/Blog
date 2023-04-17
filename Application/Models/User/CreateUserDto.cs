namespace Application.Models.User;

/// <summary>
/// Dto for creating Uset entity
/// </summary>
public class CreateUserDto
{
    /// <summary>
    /// To be created User Username
    /// </summary>
    public string Username { get; set; }
    /// <summary>
    /// To be created User Email
    /// </summary>
    public string Email { get; set; }
    /// <summary>
    /// To be created User Password
    /// </summary>
    public string Password { get; set; }
}