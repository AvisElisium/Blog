using System.Security.Claims;
using Application;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Authorization;

/// <summary>
/// <see cref="IsCommentAuthorRequirement"/> handler
/// </summary>
public class IsCommentAuthorRequirementHandler : AuthorizationHandler<OperationAuthorizationRequirement, Comment>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement,
        Comment resource)
    {
        if (context.User.IsInRole("Admin")) context.Succeed(requirement);

        if (requirement.Name == Operations.Create.Name) context.Succeed(requirement);

        if (requirement.Name == Operations.Delete.Name || requirement.Name == Operations.Update.Name)
        {
            if (context.User.FindFirstValue(ClaimTypes.Name) == resource.Author.UserName) context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}