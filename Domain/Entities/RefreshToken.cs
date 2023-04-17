namespace Domain.Entities;

/// <summary>
/// Class representing RefreshToken entity
/// </summary>
public class RefreshToken
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Value of RefreshToken
    /// </summary>
    public string Value { get; set; }
    /// <summary>
    /// Time of creation
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    /// <summary>
    /// Time of expiration
    /// </summary>
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(7);
    /// <summary>
    /// Is RefreshToken revoked
    /// </summary>
    public bool IsRevoked { get; set; } = false;
    /// <summary>
    /// time when RefreshToken was revoked
    /// </summary>
    public DateTime RevokedAt { get; set; }
    /// <summary>
    /// Is RefreshToken expired
    /// </summary>
    public bool IsExpired => DateTime.UtcNow > ExpiresAt;
    /// <summary>
    /// Is RefreshToken active
    /// </summary>
    public bool IsActive => !IsExpired && !IsRevoked;
    /// <summary>
    /// <see cref="User"/> to which RefreshToken belongs
    /// </summary>
    public User User { get; set; }
}