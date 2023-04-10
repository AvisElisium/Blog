using Application.Models.Comments;
using MediatR;

namespace Application.Commands.Comment;

public record CreateComment(CreateCommentDto Dto) : IRequest<CommentDto>
{
    
}