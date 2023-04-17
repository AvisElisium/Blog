using Application.Models.Comments;
using MediatR;

namespace Application.Queries.Account;

/// <summary>
/// Get Last Comments under author articles query
/// </summary>
public record GetLastComments: IRequest<List<CommentDto>>
{
    
}