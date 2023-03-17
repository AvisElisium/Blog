using Api.Middleware;

namespace Api.Extensions;

public static class CustomMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomMiddleware(this IApplicationBuilder builder)
    { 
        builder.UseMiddleware<ErrorHandlingMiddleware>();
        
        return builder;
    }

    public static IServiceCollection AddCustomMiddleware(this IServiceCollection services)
    {
        services.AddSingleton<ErrorHandlingMiddleware>();

        return services;
    }
}