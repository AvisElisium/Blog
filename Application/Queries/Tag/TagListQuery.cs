﻿using Application.Models.Tag;
using MediatR;

namespace Application.Queries.Tag;

/// <summary>
/// Tag List query
/// </summary>
public record TagListQuery : IRequest<List<TagDto>>
{
    
}