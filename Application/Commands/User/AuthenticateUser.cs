using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

public record AuthenticateUser(LoginUserDto Dto) : IRequest<UserDto>
{
}