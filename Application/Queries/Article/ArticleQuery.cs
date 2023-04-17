using Application.Models.Article;
using MediatR;

namespace Application.Queries.Article;

/// <summary>
/// Article query
/// </summary>
/// <param name="Id">Article Id</param>
public record ArticleQuery(Guid Id) : IRequest<ArticleDto?>
{
    
}