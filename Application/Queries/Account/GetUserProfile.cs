using Application.Models.Profile;
using MediatR;

namespace Application.Queries.Account;

public record GetUserProfile(string Username) : IRequest<UserProfileDto>
{
    
}