using Application.Models.Tag;
using MediatR;

namespace Application.Queries.Tag;

public record TagListQuery : IRequest<List<TagDto>>
{
    
}