namespace Domain.Entities;

public class Article
{
    public Guid Id { get; set; }
    public string Headline { get; set; }
    public string Content { get; set; }
    public User Author { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}