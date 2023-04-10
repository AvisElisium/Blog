using Application.Models.Comments;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Queries.Comment;

public class LoadArticleCommentsHandler: IRequestHandler<LoadArticleComments, List<CommentDto>>
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public LoadArticleCommentsHandler(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    
    public Task<List<CommentDto>> Handle(LoadArticleComments request, CancellationToken cancellationToken)
    {
        var comments = _context.Comments.Where(x => x.Article.Id == request.ArticleId)
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken: cancellationToken);

        return comments;
    }
}