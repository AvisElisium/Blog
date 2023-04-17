using Application.Models.Profile;
using MediatR;

namespace Application.Queries.Account;

/// <summary>
/// Get User Profile query
/// </summary>
/// <param name="Username">Username</param>
public record GetUserProfile(string Username) : IRequest<UserProfileDto>
{
    
}