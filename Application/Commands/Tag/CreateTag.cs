using Application.Models.Tag;
using MediatR;

namespace Application.Commands.Tag;

public record CreateTag(CreateTagDto Dto) : IRequest<Guid>;