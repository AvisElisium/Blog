using Microsoft.AspNetCore.Http;

namespace Infrastructure.services;

public interface IImageService
{
    public Task<(string, Uri)> UploadImage(IFormFile image);

    public Task DeleteImage(string publicId);
}