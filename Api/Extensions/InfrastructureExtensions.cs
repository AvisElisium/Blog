using Infrastructure;
using Infrastructure.services;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions;

public static class InfrastructureExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("Postgres"));
        });

        services.AddSingleton<IImageService, ImageService>();

        return services;
    }
}