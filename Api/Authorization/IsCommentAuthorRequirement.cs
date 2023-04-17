using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Authorization;

/// <summary>
/// Is Comment Author Requirement
/// </summary>
public class IsCommentAuthorRequirement : OperationAuthorizationRequirement
{
    
}