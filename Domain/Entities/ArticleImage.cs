namespace Domain.Entities;

/// <summary>
/// Class representing ArticleImage
/// </summary>
/// <inheritdoc cref="Image"/>
public class ArticleImage : Image
{
    /// <summary>
    /// Id of Article to which image belongs
    /// </summary>
    public Guid ArticleId { get; set; }
    /// <summary>
    /// Article to which image belongs
    /// </summary>
    public Article Article { get; set; }
}