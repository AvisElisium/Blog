using Application.Models.Article;
using MediatR;

namespace Application.Queries.Article;

public record AuthorsQuery: IRequest<List<AuthorDto>>
{
    
}