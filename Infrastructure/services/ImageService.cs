using System.Net.Mime;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.services;

public class ImageService : IImageService
{
    private readonly Cloudinary _cloudinary;
    
    public ImageService(CloudinaryConfiguration configuration)
    {
        var account = new Account(configuration.CloudName, configuration.ApiKey, configuration.ApiSecret);
        _cloudinary = new Cloudinary(account);
    }
    
    public async Task<(string, Uri)> UploadImage(IFormFile image)
    {
        if (image.Length <= 0)
        {
            throw new Exception("File in required");
        }
        
        await using var stream = image.OpenReadStream();

        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(image.FileName, stream),
            UseFilename = true,
        };

        var result = _cloudinary.Upload(uploadParams);

        if (result.Error is not null)
        {
            throw new Exception();
        }

        return (result.PublicId, result.Url);
    }

    public async Task DeleteImage(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);

        if (result.Error is not null) throw new Exception();
    }
}