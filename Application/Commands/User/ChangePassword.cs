using Application.Models.User;
using MediatR;

namespace Application.Commands.User;

public record ChangePassword(ChangePasswordDto Dto) : IRequest
{
    
}