using System.Net;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs.Filters;

public class ExceptionHandlerFilter : IHubFilter
{
    private readonly IWebHostEnvironment _environment;

    public ExceptionHandlerFilter(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async ValueTask<object?> InvokeMethodAsync(HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object?>> next)
    {
        try
        {
            return await next(invocationContext);
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