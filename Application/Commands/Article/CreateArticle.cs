using Application.Models.Article;
using Application.Models.User;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands.Article;

/// <summary>
/// Create Article Command
/// </summary>
/// <param name="Dto"><see cref="CreateArticleDto"/></param>
/// <param name="File"><see cref="IFormFile"/></param>
public record CreateArticle(CreateArticleDto Dto, IFormFile File) : IRequest<Guid>
{
    
}