using MediatR;

namespace Application.Commands.Image;

public record DeleteImage(Guid Id): IRequest;