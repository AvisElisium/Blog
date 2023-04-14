using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Authorization;

public class IsCommentAuthorRequirement : OperationAuthorizationRequirement
{
    
}