using MediatR;

namespace Application.Commands.Article;

public record DeleteArticle(Guid Id) : IRequest
{
    
}