namespace Application.Models.Image;

public class UploadImageResult
{
    public Uri Uri { get; set; }
    public string Alt { get; set; }
    public string PublicId { get; set; }
    public Guid Id { get; set; }
}