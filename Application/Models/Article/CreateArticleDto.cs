namespace Application.Models.Article;

/// <summary>
/// Dto for Article Creation
/// </summary>
public class CreateArticleDto
{
    /// <summary>
    /// To be created Article Headline
    /// </summary>
    public string Headline { get; set; }
    /// <summary>
    /// To be created Article Content
    /// </summary>
    public string Content { get; set; }
    /// <summary>
    /// To be created Article IsFeatured
    /// </summary>
    public bool IsFeatured { get; set; }
    /// <summary>
    /// Ids of tags to which to be created Article belongs
    /// </summary>
    public List<Guid>? TagIds { get; set; }
}