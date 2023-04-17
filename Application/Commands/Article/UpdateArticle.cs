using Application.Models.Article;
using MediatR;

namespace Application.Commands.Article;

/// <summary>
/// Update Article command
/// </summary>
/// <param name="Dto"><see cref="CreateArticleDto"/></param>
/// <param name="Id">To be updated Article Id</param>
public record UpdateArticle(CreateArticleDto Dto, Guid Id) : IRequest
{
    
}