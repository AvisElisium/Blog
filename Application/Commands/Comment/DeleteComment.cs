using Application.Models.Comments;
using MediatR;

namespace Application.Commands.Comment;

/// <summary>
/// Delete Comment command
/// </summary>
/// <param name="Dto"><see cref="DeleteCommentDto"/></param>
public record DeleteComment(DeleteCommentDto Dto) : IRequest<Guid>
{
    
}