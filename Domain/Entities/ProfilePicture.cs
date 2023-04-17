namespace Domain.Entities;

/// <summary>
/// Class representing ProfilePicture entity
/// </summary>
/// <inheritdoc cref="Image"/>
public class ProfilePicture : Image
{
    /// <summary>
    /// User to which ProfilePicture belongs
    /// </summary>
    public User User { get; set; }
    /// <summary>
    /// Id of User to which ProfilePicture belongs
    /// </summary>
    public string UserId { get; set; }
}