using Api.Responses;
using Application.Commands.User;
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
[Produces("application/json")]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;


    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    /// <summary>
    /// Action for creating new user
    /// </summary>
    /// <param name="dto"><see cref="CreateUserDto"/></param>
    /// <returns><see cref="IActionResult"/></returns>
    /// <response code="204">Successfully created user</response>
    /// <response code="400">Validation error</response>
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ValidationErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] CreateUserDto dto)
    {
        await _mediator.Send(new CreateNewUser(dto));
        return NoContent();
    }

    /// <summary>
    /// Action for authenticating existing user
    /// </summary>
    /// <param name="dto"><see cref="LoginUserDto"/></param>
    /// <returns><see cref="UserDto"/></returns>
    /// <response code="200">Successfully logged in</response>
    /// <response code="404">User don't exists or wrong combination of login and password</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginUserDto dto)
    {
        var result = await _mediator.Send(new AuthenticateUser(dto));

        return Ok(result);
    }

    /// <summary>
    /// Action for refreshing JWT
    /// </summary>
    /// <returns><see cref="UserDto"/></returns>
    /// <response code="200">Successfully refreshed JWT</response>
    /// <response code="401">User is not authenticated</response>
    [Authorize]
    [HttpGet("refreshJwt")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<UserDto>> RefreshJwt()
    {
        return Ok(await _mediator.Send(new RefreshJwt()));
    }

    /// <summary>
    /// Action for getting User Profile
    /// </summary>
    /// <returns><see cref="UserDto"/></returns>
    /// <response code="200">Successfully logged in</response>
    /// <response code="404">User not found</response>
    [HttpGet("{username}")]
    [ProducesResponseType(typeof(UserProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile([FromRoute] string username)
    {
        return Ok(await _mediator.Send(new GetUserProfile(username)));
    }

    /// <summary>
    /// Action for setting Profile Picture
    /// </summary>
    /// <param name="file"><see cref="IFormFile"/></param>
    /// <returns><see cref="IActionResult"/></returns>
    /// <response code="200">Successfully logged in</response>
    /// <response code="500">Error during image upload</response>
    [HttpPost("profilePicture")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> SetProfilePicture([FromForm] IFormFile file)
    {
        await _mediator.Send(new SetProfilePicture(file));
            
        return Ok();
    }
    
    /// <summary>
    /// Get last comments under current user articles
    /// </summary>
    /// <returns>List of comments</returns>
    /// <response code="200">Gets list of comments</response>
    [HttpGet("lastComments")]
    [Authorize(Roles = "Author,Admin")]
    [ProducesResponseType(typeof(List<CommentDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<CommentDto>>> GetLastComments()
    {
        return Ok(await _mediator.Send(new GetLastComments()));
    }
}