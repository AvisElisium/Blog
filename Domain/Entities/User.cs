using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

/// <summary>
/// Class representing User entity
/// </summary>
/// <inheritdoc cref="IdentityUser"/>
public class User : IdentityUser
{
    /// <summary>
    /// List of <see cref="Article"/>s created by this User
    /// </summary>
    public ICollection<Article> Articles { get; set; } = new List<Article>();
    /// <summary>
    /// UserType of User, later upon token creation is translated to <see cref="IdentityRole{TKey}"/>
    /// </summary>
    public UserTypes UserType { get; set; } = UserTypes.Member;
    /// <summary>
    /// List of <see cref="RefreshToken"/>s belonging to this User
    /// </summary>
    public ICollection<RefreshToken> RefreshTokens { get; set; }
    /// <summary>
    /// List of <see cref="Comment"/>s created by this User
    /// </summary>
    public ICollection<Comment> Comments { get; set; }
    /// <summary>
    /// Time of creation
    /// </summary>
    public DateTime Joined { get; set; } = DateTime.UtcNow;
    /// <summary>
    /// ProfilePicture of user
    /// </summary>
    public ProfilePicture ProfilePicture { get; set; }
}