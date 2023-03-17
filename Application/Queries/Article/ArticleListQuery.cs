﻿using Application.Models;
using Application.Models.Article;
using Application.Models.Pagination;
using MediatR;

namespace Application.Queries.Article;

public record ArticleListQuery(PaginationParams PaginationParams) : IRequest<PagedList<ArticleDto>>
{
}