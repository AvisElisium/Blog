using Application.Models.Article;
using MediatR;

namespace Application.Queries.Article;

public record ArticleQuery(Guid Id) : IRequest<ArticleDto?>
{
    
}