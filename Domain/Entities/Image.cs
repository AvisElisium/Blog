namespace Domain.Entities;

public class Image
{
    public Guid Id { get; set; }
    public string PublicId { get; set; }
    public string Alt { get; set; }
    public Uri Uri { get; set; }
    public string Filename { get; set; }
}