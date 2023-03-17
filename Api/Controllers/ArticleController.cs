using Api.Extensions;
using Application.Commands.Article;
using Application.Models.Article;
using Application.Models.Pagination;
using Application.Queries.Article;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticleController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public ArticleController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<PagedList<ArticleDto>>> GetArticleList([FromQuery] PaginationParams paginationParams)
    {
        var list = await _mediator.Send(new ArticleListQuery(paginationParams));
        Response.AddPaginationHeader(list);
        return Ok(list);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateArticle([FromBody] CreateArticleDto dto)
    {
        var id = await _mediator.Send(new CreateArticle(dto));

        var url = $"{Request.Scheme}://{Request.Host}/api/article/{id}";
        
        return Created(url, id);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ArticleDto>> GetArticle([FromRoute] Guid id)
    {
        var article = await _mediator.Send(new ArticleQuery(id));

        return Ok(article);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateArticle([FromBody] CreateArticleDto dto, [FromRoute] Guid id)
    {
        await _mediator.Send(new UpdateArticle(dto, id));
        return Ok(id);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteArticle([FromRoute] Guid id)
    {
        await _mediator.Send(new DeleteArticle(id));
        return Ok(id);
    }
}