using Application.Exceptions;
using Application.Models.Article;
using Application.Models.Comments;
using Application.Models.Profile;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Account;

/// <summary>
/// <see cref="GetUserProfile"/> handler
/// </summary>
public class GetUserProfileHandler : IRequestHandler<GetUserProfile, UserProfileDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GetUserProfileHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserProfileDto> Handle(GetUserProfile request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Include(x => x.ProfilePicture)
            .SingleOrDefaultAsync(x => x.UserName == request.Username, cancellationToken: cancellationToken);
            
        if (user is null) throw new NotFoundException($"User with username {request.Username} was not found");

        var profile = _mapper.Map<UserProfileDto>(user);

        var lastComments = await _context.Comments
            .Where(x => x.Author.UserName == request.Username)
            .OrderByDescending(x => x.CreatedAt)
            .Take(5)
            .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
            .AsNoTracking()
            .ToListAsync(cancellationToken: cancellationToken);
        
        var lastArticles = await _context.Articles
            .Where(x => x.Author.UserName == request.Username)
            .OrderByDescending(x => x.CreatedAt)
            .Take(5)
            .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
            .AsNoTracking()
            .ToListAsync(cancellationToken: cancellationToken);

        profile.LastArticles = lastArticles;
        profile.LastComments = lastComments;

        return profile;
    }
}