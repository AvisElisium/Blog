using Application.Commands.Comment;
using Application.Models.Comments;
using Application.Queries.Comment;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Api.Hubs.Filters;

namespace Api.Hubs;

/// <summary>
/// Hub for realtime comment actions
/// </summary>
public class CommentHub : Hub
{
    private readonly IMediator _mediator;

    public CommentHub(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    /// <summary>
    /// Method for creating comment
    /// </summary>
    /// <param name="dto"><see cref="CreateCommentDto"/></param>
    public async Task CreateComment(CreateCommentDto dto)
    {
        var comment = await _mediator.Send(new CreateComment(dto));

        await Clients.Group(dto.ArticleId.ToString()).SendAsync("ReceiveComment", comment);
    }

    /// <summary>
    /// Method for deleting comment
    /// </summary>
    /// <param name="dto"><see cref="DeleteCommentDto"/></param>
    [Authorize]
    public async Task DeleteComment(DeleteCommentDto dto)
    {
        var id = await _mediator.Send(new DeleteComment(dto));

        await Clients.Group(dto.ArticleId.ToString()).SendAsync("DeletedComment", id);
    }

    /// <summary>
    /// On connect automatically joins to group depending on query string articleId parameter
    /// </summary>
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var articleId = httpContext.Request.Query["articleId"];

        await Groups.AddToGroupAsync(Context.ConnectionId, articleId);
        var comments = await _mediator.Send(new LoadArticleComments(Guid.Parse(articleId)));
        await Clients.Caller.SendAsync("LoadComments", comments);
    }
}