using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

/// <summary>
/// Create New User command
/// </summary>
/// <param name="Dto"><see cref="CreateUserDto"/></param>
public record CreateNewUser(CreateUserDto Dto) : IRequest {}