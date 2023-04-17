namespace Domain.Entities;

/// <summary>
/// Class representing Article entity
/// </summary>
public class Article
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Headline
    /// </summary>
    public string Headline { get; set; }
    /// <summary>
    /// Text content
    /// </summary>
    public string Content { get; set; }
    /// <summary>
    /// Author of Article
    /// </summary>
    public User Author { get; set; }
    /// <summary>
    /// Time of creation
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    /// <summary>
    /// List of comments
    /// </summary>
    public ICollection<Comment> Comments { get; set; }
    /// <summary>
    /// Cover image of article
    /// </summary>
    public ArticleImage ArticleImage { get; set; }
    /// <summary>
    /// is featured
    /// </summary>
    public bool IsFeatured { get; set; } = false;
    /// <summary>
    /// List of tags
    /// </summary>
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
}