using Application.Models.Article;
using Application.Models.User;
using MediatR;

namespace Application.Commands.Article;

public record CreateArticle(CreateArticleDto Dto) : IRequest<Guid>
{
    
}