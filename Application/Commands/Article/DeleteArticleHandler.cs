using Application.Exceptions;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Article;

/// <summary>
/// <see cref="DeleteArticle"/> handler
/// </summary>
public class DeleteArticleHandler : IRequestHandler<DeleteArticle>
{
    private readonly AppDbContext _context;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public DeleteArticleHandler(AppDbContext context, IUserService userService, IMapper mapper)
    {
        _context = context;
        _userService = userService;
        _mapper = mapper;
    }
    
    public async Task Handle(DeleteArticle request, CancellationToken cancellationToken)
    {
        var article = await _context.Articles
            .Include(x => x.Author)
            .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (article is null) throw new NotFoundException($"Article with {request.Id} was not found");

        var result = await _userService.AuthorizeUserAsync(article, Operations.Delete);

        if (!result) throw new ForbiddenException($"You don't have permission to modify Article {request.Id}");

        _context.Remove(article);
        await _context.SaveChangesAsync(cancellationToken);
    }
}