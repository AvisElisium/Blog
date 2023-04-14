using Application.Models.Article;
using Application.Models.User;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.Article;

public record CreateArticle(CreateArticleDto Dto, IFormFile File) : IRequest<Guid>
{
    
}