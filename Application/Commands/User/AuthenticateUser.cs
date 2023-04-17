using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

/// <summary>
/// Authenticate User command
/// </summary>
/// <param name="Dto"><see cref="LoginUserDto"/></param>
public record AuthenticateUser(LoginUserDto Dto) : IRequest<UserDto>
{
}