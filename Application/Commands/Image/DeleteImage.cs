using MediatR;

namespace Application.Commands.Image;

/// <summary>
/// Delete Image command
/// </summary>
/// <param name="Id">to be deleted image Id</param>
public record DeleteImage(Guid Id): IRequest;