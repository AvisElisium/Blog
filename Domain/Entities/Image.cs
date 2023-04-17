namespace Domain.Entities;

/// <summary>
/// Base class for image entity
/// </summary>
public abstract class Image
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Public Id of Image
    /// </summary>
    public string PublicId { get; set; }
    /// <summary>
    /// Alternate text of image
    /// </summary>
    public string? Alt { get; set; }
    /// <summary>
    /// Uri of image
    /// </summary>
    public Uri Uri { get; set; }
    /// <summary>
    /// Image Filename
    /// </summary>
    public string Filename { get; set; }
}