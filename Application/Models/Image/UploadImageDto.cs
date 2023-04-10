using Microsoft.AspNetCore.Http;

namespace Application.Models.Image;

public class UploadImageDto
{
    public string Alt { get; set; }
    public IFormFile File { get; set; }
}