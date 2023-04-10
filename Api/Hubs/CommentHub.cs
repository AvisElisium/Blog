using Application.Commands.Comment;
using Application.Models.Comments;
using Application.Queries.Comment;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs;

public class CommentHub : Hub
{
    private readonly IMediator _mediator;

    public CommentHub(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    public async Task CreateComment(CreateCommentDto dto)
    {
        var comment = await _mediator.Send(new CreateComment(dto));

        await Clients.Group(dto.ArticleId.ToString()).SendAsync("ReceiveComment", comment);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var articleId = httpContext.Request.Query["articleId"];

        await Groups.AddToGroupAsync(Context.ConnectionId, articleId);
        var comments = await _mediator.Send(new LoadArticleComments(Guid.Parse(articleId)));
        await Clients.Caller.SendAsync("LoadComments", comments);
    }
}