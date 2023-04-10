namespace Domain.Entities;

public class Comment
{
    public Guid Id { get; set; }
    public User Author { get; set; }
    public Article Article { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}