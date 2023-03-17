using System.Net;
using Application.Exceptions;

namespace Api.Middleware;

public class ErrorHandlingMiddleware : IMiddleware
{
    private readonly IWebHostEnvironment _environment;

    public ErrorHandlingMiddleware(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    private async Task SendError(HttpContext context, Exception e, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
    {
        var errorResponse = new
        {
            e.Message,
            StackTrace = _environment.IsDevelopment() ? e.StackTrace : null,
        };

        context.Response.StatusCode = (int)statusCode;
        await context.Response.WriteAsJsonAsync(errorResponse);
    }
    
    private async Task SendError(HttpContext context, Exception e,
        IDictionary<string, string[]> validationErrors, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
    {
        var errorResponse = new
        {
            e.Message,
            StackTrace = _environment.IsDevelopment() ? e.StackTrace : null,
            ValidationErrors = validationErrors,
        };

        context.Response.StatusCode = (int)statusCode;
        await context.Response.WriteAsJsonAsync(errorResponse);
    }
    

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException e)
        {
            await SendError(context, e, e.ValidationErrors,e.StatusCode);
        }
        catch (UnauthorizedException e)
        {
            await SendError(context, e, e.StatusCode);
        }
        catch (ForbiddenException e)
        {
            await SendError(context, e, e.StatusCode);
        }
        catch (NotFoundException e)
        {
            await SendError(context, e, e.StatusCode);
        }
        catch (Exception e)
        {
            await SendError(context, e);
        }
    }
}