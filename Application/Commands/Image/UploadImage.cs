using Application.Models.Image;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.Image;

/// <summary>
/// Upload Image command
/// </summary>
/// <param name="File"><see cref="IFormFile"/></param>
/// <param name="Alt">Alternate text</param>
public record UploadImage(IFormFile File, string Alt): IRequest<UploadImageResult>
{
    
}