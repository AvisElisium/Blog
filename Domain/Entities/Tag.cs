namespace Domain.Entities;

/// <summary>
/// Class representing Tag entity
/// </summary>
public class Tag
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Name of Tag
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Is tag featured
    /// </summary>
    public bool IsFeatured { get; set; } = false;
    /// <summary>
    /// List of <see cref="Article"/>s containing this tag
    /// </summary>
    public ICollection<Article> Articles { get; set; } = new List<Article>();
}