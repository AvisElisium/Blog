using Api.Hubs.Filters;
using Api.Services;
using Application;
using Application.Models.Article;
using Application.Models.Comments;
using Application.Models.Tag;
using Application.Models.User;
using Application.Services;
using Application.Validators;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.SignalR;

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
        services.AddTransient<IValidator<CreateCommentDto>, CreateCommentValidator>();
        services.AddTransient<IValidator<CreateTagDto>, CreateTagValidator>();
        services.AddTransient<IValidator<ChangePasswordDto>, ChangePasswordValidator>();
        services.AddScoped<IUserService, UserService>();
        services.AddSignalR(options =>
        {
            options.AddFilter<ExceptionHandlerFilter>();
        });
        services.AddSingleton<ExceptionHandlerFilter>()
            ;
        return services;
    }
}