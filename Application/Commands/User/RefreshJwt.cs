using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

public record RefreshJwt() : IRequest<UserDto>
{
    
}