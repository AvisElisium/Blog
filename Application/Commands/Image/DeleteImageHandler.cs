using Application.Exceptions;
using Infrastructure;
using Infrastructure.services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Image;

public class DeleteImageHandler: IRequestHandler<DeleteImage>
{
    private readonly AppDbContext _context;
    private readonly IImageService _imageService;

    public DeleteImageHandler(AppDbContext context, IImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }
    
    public async Task Handle(DeleteImage request, CancellationToken cancellationToken)
    {
        var image = await _context.Images.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

        if (image is null) throw new NotFoundException($"image with id {request.Id} was not found");

        await _imageService.DeleteImage(image.PublicId);

        _context.Remove(image);
        await _context.SaveChangesAsync(cancellationToken);
    }
}