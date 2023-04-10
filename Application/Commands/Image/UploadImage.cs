using Application.Models.Image;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.Image;

public record UploadImage(IFormFile File, string Alt): IRequest<UploadImageResult>
{
    
}