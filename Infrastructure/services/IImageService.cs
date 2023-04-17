using Microsoft.AspNetCore.Http;

namespace Infrastructure.services;

/// <summary>
/// Service class to interact with images
/// </summary>
public interface IImageService
{
    /// <summary>
    /// Method for uploading image
    /// </summary>
    /// <param name="image">Image to upload</param>
    /// <returns></returns>
    public Task<(string, Uri)> UploadImage(IFormFile image);

    /// <summary>
    /// Method for deleting image
    /// </summary>
    /// <param name="publicId">publicId of image to delete</param>
    /// <returns></returns>
    public Task DeleteImage(string publicId);
}