using Application.Models.Comments;
using MediatR;

namespace Application.Commands.Comment;

public record DeleteComment(DeleteCommentDto Dto) : IRequest<Guid>
{
    
}