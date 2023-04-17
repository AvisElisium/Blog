using Application.Models.Tag;
using MediatR;

namespace Application.Commands.Tag;

/// <summary>
/// Create Tag command
/// </summary>
/// <param name="Dto"><see cref="CreateTagDto"/></param>
public record CreateTag(CreateTagDto Dto) : IRequest<Guid>;