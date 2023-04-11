using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser
{
    public ICollection<Article> Articles { get; set; } = new List<Article>();
    public UserTypes UserType { get; set; } = UserTypes.Member;
    public ICollection<RefreshToken> RefreshTokens { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public DateTime Joined { get; set; } = DateTime.UtcNow;
}