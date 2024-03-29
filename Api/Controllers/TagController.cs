﻿using Application.Commands.Tag;
using Application.Models.Tag;
using Application.Queries.Tag;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private readonly IMediator _mediator;

    public TagController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Author")]
    public async Task<ActionResult<Guid>> CreateTag([FromBody] CreateTagDto dto)
    {
        return Ok(await _mediator.Send(new CreateTag(dto)));
    }

    [HttpGet]
    public async Task<ActionResult<List<TagDto>>> GetTagList([FromQuery] TagListQueryParams queryParams)
    {
        return Ok(await _mediator.Send(new TagListQuery(queryParams)));
    }
}