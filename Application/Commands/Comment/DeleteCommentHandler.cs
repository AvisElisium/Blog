using Application.Exceptions;
using Application.Services;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Comment;

/// <summary>
/// <see cref="DeleteComment"/> handler
/// </summary>
public class DeleteCommentHandler : IRequestHandler<DeleteComment, Guid>
{
    private readonly AppDbContext _context;
    private readonly IUserService _userService;

    public DeleteCommentHandler(AppDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }
    
    public async Task<Guid> Handle(DeleteComment request, CancellationToken cancellationToken)
    {
        var comment = await _context.Comments
            .Include(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == request.Dto.CommentId, cancellationToken: cancellationToken);

        if (comment is null) throw new NotFoundException($"Comment with id {request.Dto.CommentId} was not found");
        
        var result = await _userService.AuthorizeUserAsync(comment, Operations.Update);

        if (result is false) throw new ForbiddenException("You can delete only comments belonging to you");

        _context.Remove(comment);
        await _context.SaveChangesAsync(cancellationToken);

        return request.Dto.CommentId;
    }
}