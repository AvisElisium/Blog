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
        var article = await _context.Articles
            .Include(x => x.Tags)
            .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (article is null) throw new NotFoundException($"Article with {request.Id} was not found");

        var result = await _userService.AuthorizeUserAsync(article, Operations.Update);
        
        if (!result) throw new ForbiddenException($"You don't have permission to delete Article {request.Id}");

        _mapper.Map<CreateArticleDto, Domain.Entities.Article>(request.Dto, article);

        if (request.Dto.TagIds is not null)
        {
            var tags = _context.Tags.Where(x => request.Dto.TagIds.Contains(x.Id)).ToList();

            var intersect = tags.Intersect(article.Tags).ToList();

            var toAdd = tags.Except(intersect).ToList();
            var toDelete = article.Tags.Except(intersect).ToList();

            foreach (var tag in toAdd)
            {
                article.Tags.Add(tag);
            }
            
            foreach (var tag in toDelete)
            {
                article.Tags.Remove(tag);
            }

        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}