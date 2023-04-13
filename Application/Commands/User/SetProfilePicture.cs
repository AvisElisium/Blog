using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.User;

public record SetProfilePicture(IFormFile File) : IRequest;