using Application.Models.Comments;
using MediatR;

namespace Application.Commands.Comment;

/// <summary>
/// Create Comment command
/// </summary>
/// <param name="Dto"><see cref="CreateCommentDto"/></param>
public record CreateComment(CreateCommentDto Dto) : IRequest<CommentDto>
{
    
}