using Application.Models.Article;
using MediatR;

namespace Application.Commands.Article;

public record UpdateArticle(CreateArticleDto Dto, Guid Id) : IRequest
{
    
}