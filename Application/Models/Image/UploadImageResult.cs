namespace Application.Models.Image;

/// <summary>
/// Result of image upload for the client 
/// </summary>
public class UploadImageResult
{
    public Uri Uri { get; set; }
    public string Alt { get; set; }
    public string PublicId { get; set; }
    public Guid Id { get; set; }
}