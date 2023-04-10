using Application.Models.Comments;
using MediatR;

namespace Application.Queries.Comment;

public record LoadArticleComments(Guid ArticleId): IRequest<List<CommentDto>>
{
}