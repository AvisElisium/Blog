using Application.Exceptions;
using Application.Models.Comments;
using Application.Services;
using AutoMapper;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Comment;

public class CreateCommentHandler : IRequestHandler<CreateComment, CommentDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public CreateCommentHandler(AppDbContext context, IMapper mapper, IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }
    
    public async Task<CommentDto> Handle(CreateComment request, CancellationToken cancellationToken)
    {
        var comment = _mapper.Map<Domain.Entities.Comment>(request.Dto);
        comment.Id = Guid.NewGuid();
        
        var article = await _context.Articles.SingleOrDefaultAsync(x => x.Id == request.Dto.ArticleId, cancellationToken: cancellationToken);
        var authorUsername = _userService.GetCurrentUserUsername();
        var author = await _context.Users.SingleOrDefaultAsync(x => x.UserName == authorUsername, cancellationToken: cancellationToken);

        if (article is null) throw new NotFoundException($"Article with id {request.Dto.ArticleId} was not found");
        if (author is null) throw new UnauthorizedException();

        comment.Article = article;
        comment.Author = author;

        _context.Comments.Add(comment);

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<CommentDto>(comment);
    }
}