using Application.Models.Comments;
using MediatR;

namespace Application.Queries.Account;

public record GetLastComments: IRequest<List<CommentDto>>
{
    
}