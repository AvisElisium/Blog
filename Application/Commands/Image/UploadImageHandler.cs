using Application.Exceptions;
using Application.Models.Image;
using Infrastructure;
using Infrastructure.services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Image;

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

        var image = new Domain.Entities.Image()
        {
            Alt = request.Alt,
            Filename = request.File.FileName,
            PublicId = result.Item1,
            Uri = result.Item2,
        };

        _context.Add(image);
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