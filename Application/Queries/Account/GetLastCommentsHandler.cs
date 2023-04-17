using Application.Models.Comments;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Account;

/// <summary>
/// <see cref="GetLastComments"/> handler
/// </summary>
public class GetLastCommentsHandler : IRequestHandler<GetLastComments, List<CommentDto>>
{
    private readonly AppDbContext _context;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public GetLastCommentsHandler(AppDbContext context, IUserService userService, IMapper mapper)
    {
        _context = context;
        _userService = userService;
        _mapper = mapper;
    }
    
    public async Task<List<CommentDto>> Handle(GetLastComments request, CancellationToken cancellationToken)
    {
        var username = _userService.GetCurrentUserUsername();

        return await _context.Comments
            .Where(x => x.Article.Author.UserName == username)
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}