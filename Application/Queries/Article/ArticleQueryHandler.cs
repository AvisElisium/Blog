using Application.Exceptions;
using Application.Models.Article;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Article;

/// <summary>
/// <see cref="ArticleQuery"/> handler
/// </summary>
public class ArticleQueryHandler : IRequestHandler<ArticleQuery, ArticleDto?>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ArticleQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<ArticleDto?> Handle(ArticleQuery request, CancellationToken cancellationToken)
    {
        var article = await _context.Articles
            .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (article is null) throw new NotFoundException($"Article {request.Id} was not found");

        return article;
    }
}