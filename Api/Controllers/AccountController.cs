using Application.Commands.User;
using Application.Models.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;


    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserDto dto)
    {
        await _mediator.Send(new CreateNewUser(dto));
        return NoContent();
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginUserDto dto)
    {
        var result = await _mediator.Send(new AuthenticateUser(dto));

        return Ok(result);
    }

    [Authorize]
    [HttpGet("refreshJwt")]
    public async Task<ActionResult<UserDto>> RefreshJwt()
    {
        return Ok(await _mediator.Send(new RefreshJwt()));
    }
}