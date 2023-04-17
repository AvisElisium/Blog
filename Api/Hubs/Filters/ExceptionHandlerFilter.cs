using System.ComponentModel.DataAnnotations;
using System.Net;
using Api.Middleware;
using Microsoft.AspNetCore.SignalR;
using ValidationException = Application.Exceptions.ValidationException;

namespace Api.Hubs.Filters;

/// <summary>
/// Alternative to <see cref="ErrorHandlingMiddleware"/> in Hub context
/// </summary>
public class ExceptionHandlerFilter : IHubFilter
{
    private readonly IWebHostEnvironment _environment;

    public ExceptionHandlerFilter(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    /// <summary>
    /// Filter invoke method
    /// </summary>
    /// <param name="invocationContext"><see cref="HubInvocationContext"/></param>
    /// <param name="next">Next delegate</param>
    /// <returns></returns>
    public async ValueTask<object?> InvokeMethodAsync(HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object?>> next)
    {
        try
        {
            return await next(invocationContext);
        }
        catch (ValidationException e)
        {
            // send only first error to snackbar
            var message = e.ValidationErrors.First().Value[0];
            
            await invocationContext.Hub.Clients.Caller.SendAsync("Error", new
            {
                Message = message,
            });

            return Task.CompletedTask;
        }
        catch (Exception e)
        {
            await invocationContext.Hub.Clients.Caller.SendAsync("Error", new
            {
                Message = e.Message,
            });

            return Task.CompletedTask;
        }
    }
}