using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

/// <summary>
/// Refresh Jwt command
/// </summary>
public record RefreshJwt() : IRequest<UserDto>
{
    
}