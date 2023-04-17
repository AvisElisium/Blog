namespace Application.Models.Tag;

/// <summary>
/// Dto for creating Tag entity
/// </summary>
public class CreateTagDto
{
    /// <summary>
    /// To be created Tag Name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// To be created Tag IsFeatured
    /// </summary>
    public bool IsFeatured { get; set; }
}