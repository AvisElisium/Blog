using Application.Models.Comments;
using MediatR;

namespace Application.Queries.Comment;

/// <summary>
/// Load Article Comments query
/// </summary>
/// <param name="ArticleId">Id of Article</param>
public record LoadArticleComments(Guid ArticleId): IRequest<List<CommentDto>>
{
}