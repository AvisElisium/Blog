using System.Net;
using Api.Responses;
using Application.Exceptions;

namespace Api.Middleware;

/// <summary>
/// Middleware for handling exceptions in http context
/// </summary>
public class ErrorHandlingMiddleware : IMiddleware
{
    private readonly IWebHostEnvironment _environment;

    public ErrorHandlingMiddleware(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    /// <summary>
    /// Method for sending error response
    /// </summary>
    /// <param name="context"><see cref="HttpContent"/></param>
    /// <param name="e">Exception</param>
    /// <param name="statusCode">Status Code</param>
    private async Task SendError(HttpContext context, Exception e, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
    {
        var errorResponse = new ErrorResponse()
        {
            Message = e.Message,
            StackTrace = _environment.IsDevelopment() ? e.StackTrace : null,
        };

        context.Response.StatusCode = (int)statusCode;
        await context.Response.WriteAsJsonAsync(errorResponse);
    }
    
    /// <summary>
    /// Method for sending error response
    /// </summary>
    /// <param name="context"><see cref="HttpContent"/></param>
    /// <param name="e">Exception</param>
    /// <param name="statusCode">Status Code</param>
    /// <param name="validationErrors">Dictionary of errors</param>
    private async Task SendError(HttpContext context, Exception e,
        IDictionary<string, string[]> validationErrors, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
    {
        var errorResponse = new ValidationErrorResponse()
        {
            Message = e.Message,
            StackTrace = _environment.IsDevelopment() ? e.StackTrace : null,
            ValidationErrors = validationErrors,
        };

        context.Response.StatusCode = (int)statusCode;
        await context.Response.WriteAsJsonAsync(errorResponse);
    }
    

    /// <summary>
    /// Middleware Invoke Method
    /// </summary>
    /// <param name="context"><see cref="HttpContext"/></param>
    /// <param name="next"><see cref="RequestDelegate"/></param>
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