using Application.Models.Tag;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Tag;

/// <summary>
/// <see cref="TagListQuery"/> handler
/// </summary>
public class TagLIstQueryHandler : IRequestHandler<TagListQuery, List<TagDto>>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TagLIstQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<List<TagDto>> Handle(TagListQuery request, CancellationToken cancellationToken)
    {
        var tags = _context.Tags
            .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

        if (request.QueryParams.Featured is not null)
        {
            tags = tags.Where(x => x.IsFeatured == request.QueryParams.Featured);
        }

        return await tags.ToListAsync(cancellationToken);
    }
}