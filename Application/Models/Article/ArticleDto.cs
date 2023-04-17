using Application.Models.Tag;
using Application.Models.User;

namespace Application.Models.Article;

/// <summary>
/// Dto for Article entity
/// </summary>
public class ArticleDto
{
    /// <summary>
    /// Article Id
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Article Headline
    /// </summary>
    public string Headline { get; set; }
    /// <summary>
    /// Article Content
    /// </summary>
    public string Content { get; set; }
    /// <summary>
    /// Time of Article creation
    /// </summary>
    public DateTime CreatedAt { get; set; }
    /// <summary>
    /// Author of Article
    /// </summary>
    public AuthorDto Author { get; set; }
    /// <summary>
    /// Cover image's uri
    /// </summary>
    public Uri  Image { get; set; }
    /// <summary>
    /// Is Article featured
    /// </summary>
    public bool IsFeatured { get; set; }
    /// <summary>
    /// List of Article tags
    /// </summary>
    public List<TagDto> Tags { get; set; }
}