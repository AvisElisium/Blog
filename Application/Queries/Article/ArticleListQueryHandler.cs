using Application.Models.Article;
using Application.Models.Pagination;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;

namespace Application.Queries.Article;

/// <summary>
/// <see cref="ArticleListQuery"/> handler
/// </summary>
public class ArticleListQueryHandler : IRequestHandler<ArticleListQuery, PagedList<ArticleDto>>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ArticleListQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<PagedList<ArticleDto>> Handle(ArticleListQuery request, CancellationToken cancellationToken)
    {
        var (pageNumber, pageSize) = request.PaginationParams;
        
        var articles = _context.Articles
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        if (request.ArticleListQueryParams?.CreatedBy is not null)
        {
            articles = articles.Where(x => request.ArticleListQueryParams.CreatedBy.Contains(x.Author.Username)).AsQueryable();
        }

        if (request.ArticleListQueryParams?.featured is not null)
        {
            articles = articles.Where(x => x.IsFeatured == request.ArticleListQueryParams.featured).AsQueryable();
        }

        if (request.ArticleListQueryParams?.Tags is not null)
        {
            articles = articles.Where(x => 
                x.Tags.Any(t => 
                    request.ArticleListQueryParams.Tags.Contains(t.Name)))
                .AsQueryable();
        }

        if (request.ArticleListQueryParams?.CreatedAfter is not null)
        {
            articles = articles.Where(x => x.CreatedAt > request.ArticleListQueryParams.CreatedAfter);
        }
        
        if (request.ArticleListQueryParams?.CreatedBefore is not null)
        {
            articles = articles.Where(x => x.CreatedAt < request.ArticleListQueryParams.CreatedBefore);
        }

        var pagedArticles = await PagedList<ArticleDto>.CreateAsync(articles, pageNumber, pageSize);

        return pagedArticles;
    }
}