namespace Domain.Entities;

public class RefreshToken
{
    public Guid Id { get; set; }
    public string Value { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(7);
    public bool IsRevoked { get; set; } = false;
    public DateTime RevokedAt { get; set; }
    public bool IsExpired => DateTime.UtcNow > ExpiresAt;
    public bool IsActive => !IsExpired && !IsRevoked;
    public User User { get; set; }
}