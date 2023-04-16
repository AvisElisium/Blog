﻿using Application.Commands.User;
using Application.Models.Comments;
using Application.Models.Profile;
using Application.Models.User;
using Application.Queries.Account;
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

    [HttpGet("{username}")]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile([FromRoute] string username)
    {
        return Ok(await _mediator.Send(new GetUserProfile(username)));
    }

    [HttpPost("profilePicture")]
    [Authorize]
    public async Task<IActionResult> SetProfilePicture([FromForm] IFormFile file)
    {
        await _mediator.Send(new SetProfilePicture(file));
            
        return Ok();
    }
    
    [HttpGet("lastComments")]
    [Authorize(Roles = "Author,Admin")]
    public async Task<ActionResult<List<CommentDto>>> GetLastComments()
    {
        return Ok(await _mediator.Send(new GetLastComments()));
    }
}