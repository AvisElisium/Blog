using Application.Models.Article;
using MediatR;

namespace Application.Queries.Article;

/// <summary>
/// Authors query
/// </summary>
public record AuthorsQuery: IRequest<List<AuthorDto>>
{
    
}