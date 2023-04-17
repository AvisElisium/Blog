namespace Application.Models.Tag;

/// <summary>
/// Dto for Tag entity
/// </summary>
public class TagDto
{
    /// <summary>
    /// Id of entity
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Tag Name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Tag IsFeatured
    /// </summary>
    public bool IsFeatured { get; set; }
}