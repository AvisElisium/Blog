using System.Security.Claims;
using Application;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Authorization;

/// <summary>
/// <see cref="IsAuthorRequirement"/> handler
/// </summary>
public class IsAuthorRequirementHandler : AuthorizationHandler<OperationAuthorizationRequirement, Article>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement,
        Article resource)
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        if (context.User.IsInRole("Author") && requirement.Name == Operations.Create.Name)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        if (context.User.IsInRole("Author") && context.User.FindFirstValue(ClaimTypes.Name) == resource.Author.UserName)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        return Task.CompletedTask;
    }
}