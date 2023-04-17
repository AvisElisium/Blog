namespace Domain.Entities;

/// <summary>
/// Class representing Comment entity
/// </summary>
public class Comment
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Author of Comment
    /// </summary>
    public User Author { get; set; }
    /// <summary>
    /// Article under which comment was created
    /// </summary>
    public Article Article { get; set; }
    /// <summary>
    /// Text content of Comment
    /// </summary>
    public string Content { get; set; }
    /// <summary>
    /// Time of creation
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}