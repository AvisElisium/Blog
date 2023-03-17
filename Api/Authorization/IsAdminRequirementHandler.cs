using Microsoft.AspNetCore.Authorization;

namespace Api.Authorization;

public class IsAdminRequirementHandler : AuthorizationHandler<IsAdminRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAdminRequirement requirement)
    {
        if (context.User.IsInRole("Admin")) context.Succeed(requirement);
        
        return Task.CompletedTask;
    }
}