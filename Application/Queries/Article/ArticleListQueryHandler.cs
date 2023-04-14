﻿using Application.Models.Article;
using Application.Models.Pagination;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;

namespace Application.Queries.Article;

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
            articles = articles.Where(x => x.Author.Username == request.ArticleListQueryParams.CreatedBy).AsQueryable();
        }

        if (request.ArticleListQueryParams?.featured is not null)
        {
            articles = articles.Where(x => x.IsFeatured == request.ArticleListQueryParams.featured).AsQueryable();
        }

        var pagedArticles = await PagedList<ArticleDto>.CreateAsync(articles, pageNumber, pageSize);

        return pagedArticles;
    }
}