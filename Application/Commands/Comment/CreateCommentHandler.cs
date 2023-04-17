using Application.Exceptions;
using Application.Models.Comments;
using Application.Services;
using AutoMapper;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ValidationException = Application.Exceptions.ValidationException;

namespace Application.Commands.Comment;

/// <summary>
/// <see cref="CreateCommentDto"/> handler
/// </summary>
public class CreateCommentHandler : IRequestHandler<CreateComment, CommentDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;
    private readonly IValidator<CreateCommentDto> _validator;

    public CreateCommentHandler(AppDbContext context, IMapper mapper, IUserService userService, IValidator<CreateCommentDto> validator)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
        _validator = validator;
    }
    
    public async Task<CommentDto> Handle(CreateComment request, CancellationToken cancellationToken)
    {
        // authenticate
        var authorUsername = _userService.GetCurrentUserUsername();
        var author = await _context.Users
            .Include(x => x.ProfilePicture)
            .SingleOrDefaultAsync(x => x.UserName == authorUsername, cancellationToken: cancellationToken);
        if (author is null) throw new UnauthorizedException("You need to be logged in to create comments");
        
        // validate
        var result = await _validator.ValidateAsync(request.Dto, cancellationToken);
        if (!result.IsValid) throw new ValidationException(result.ToDictionary());
        
        var comment = _mapper.Map<Domain.Entities.Comment>(request.Dto);
        comment.Id = Guid.NewGuid();
        
        var article = await _context.Articles.SingleOrDefaultAsync(x => x.Id == request.Dto.ArticleId, cancellationToken: cancellationToken);

        if (article is null) throw new NotFoundException($"Article with id {request.Dto.ArticleId} was not found");
        comment.Article = article;
        comment.Author = author;

        _context.Comments.Add(comment);

        await _context.SaveChangesAsync(cancellationToken);

        return _mapper.Map<CommentDto>(comment);
    }
}