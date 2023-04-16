using Application.Models.Article;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Article;

public class AuthorsQueryHandler : IRequestHandler<AuthorsQuery, List<AuthorDto>>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AuthorsQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<List<AuthorDto>> Handle(AuthorsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Articles.Select(x => x.Author)
            .Distinct()
            .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}