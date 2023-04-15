namespace Domain.Entities;

public class Article
{
    public Guid Id { get; set; }
    public string Headline { get; set; }
    public string Content { get; set; }
    public User Author { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Comment> Comments { get; set; }
    public ArticleImage ArticleImage { get; set; }
    public bool IsFeatured { get; set; } = false;
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
}