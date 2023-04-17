using Application.Commands.Image;
using Application.Models.Image;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("/api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly IMediator _mediator;

    public ImageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadImage([FromForm] IFormCollection data, [FromForm] IFormFile file)
    {
        var result = await _mediator.Send(new UploadImage(file, data["alt"]));

        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> DeleteImage([FromRoute] Guid id)
    {
        await _mediator.Send(new DeleteImage(id));

        return Ok();
    }
}