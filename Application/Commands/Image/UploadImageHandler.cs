using Application.Exceptions;
using Application.Models.Image;
using Domain.Entities;
using Infrastructure;
using Infrastructure.services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Image;


/// <summary>
/// <see cref="UploadImage"/> handler
/// </summary>
public class UploadImageHandler: IRequestHandler<UploadImage, UploadImageResult>
{
    private readonly AppDbContext _context;
    private readonly IImageService _imageService;

    public UploadImageHandler(AppDbContext context, IImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }
    
    public async Task<UploadImageResult> Handle(UploadImage request, CancellationToken cancellationToken)
    {
        var result = await _imageService.UploadImage(request.File);

        var image = new MediaImage()
        {
            Alt = request.Alt,
            Filename = request.File.FileName,
            PublicId = result.Item1,
            Uri = result.Item2,
        };
        

        await _context.MediaImages.AddAsync(image, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new UploadImageResult()
        {
            Alt = image.Alt,
            Id = image.Id,
            PublicId = image.PublicId,
            Uri = image.Uri,
        };
    }
}