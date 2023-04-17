using MediatR;

namespace Application.Commands.Article;

/// <summary>
/// Delete Article command
/// </summary>
/// <param name="Id">To be deleted Article Id</param>
public record DeleteArticle(Guid Id) : IRequest
{
    
}