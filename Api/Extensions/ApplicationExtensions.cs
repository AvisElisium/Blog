using Api.Services;
using Application;
using Application.Models.Article;
using Application.Models.User;
using Application.Services;
using Application.Validators;
using FluentValidation;

namespace Api.Extensions;

public static class ApplicationExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(options =>
        {
            options.RegisterServicesFromAssembly(typeof(ApplicationMarker).Assembly);
        });

        services.AddAutoMapper(typeof(ApplicationMarker).Assembly);
        services.AddTransient<IValidator<CreateUserDto>, CreateUserValidator>();
        services.AddTransient<IValidator<CreateArticleDto>, CreateArticleValidator>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}