using Application.Models;
using Application.Models.Article;
using Application.Models.Pagination;
using MediatR;

namespace Application.Queries.Article;

/// <summary>
/// Article List query
/// </summary>
/// <param name="PaginationParams">Pagination parameters</param>
/// <param name="ArticleListQueryParams">Filter parameters</param>
public record ArticleListQuery(PaginationParams PaginationParams, ArticleListQueryParams? ArticleListQueryParams) : IRequest<PagedList<ArticleDto>>
{
}