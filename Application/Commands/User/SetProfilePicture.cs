using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.User;

/// <summary>
/// Set Profile Picture command
/// </summary>
/// <param name="File"><see cref="IFormFile"/></param>
public record SetProfilePicture(IFormFile File) : IRequest;