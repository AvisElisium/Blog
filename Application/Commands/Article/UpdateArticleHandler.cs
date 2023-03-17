using Application.Exceptions;
using Application.Models.Article;
using Application.Services;
using AutoMapper;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.Article;

public class UpdateArticleHandler : IRequestHandler<UpdateArticle>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public UpdateArticleHandler(AppDbContext context, IMapper mapper, IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }
    
    public async Task Handle(UpdateArticle request, CancellationToken cancellationToken)
    {
        var article = await _context.Articles.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (article is null) throw new NotFoundException($"Article with {request.Id} was not found");

        var result = await _userService.AuthorizeUserAsync(article, Operations.Update);
        
        if (!result) throw new ForbiddenException($"You don't have permission to delete Article {request.Id}");

        _mapper.Map<CreateArticleDto, Domain.Entities.Article>(request.Dto);

        await _context.SaveChangesAsync(cancellationToken);
    }
}