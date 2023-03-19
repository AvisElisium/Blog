using System.Text.Json;
using Api.Configuration;
using Api.Extensions;
using Api.Middleware;
using Api.Services;
using Application.Services;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var jwtConfig = new JwtConfiguration();

builder.Configuration.GetSection("Jwt").Bind(jwtConfig);

builder.Services.AddSingleton(jwtConfig);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddIdentity(jwtConfig);
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddCustomMiddleware();
builder.Services.AddCors(options =>
{
    options.AddPolicy("StandardPolicy", policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Pagination")
            .WithOrigins("http://localhost:3000", "https://localhost:3000");
    });
});

var app = builder.Build();

var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

// run migrations
try
{
    var dbContext = services.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    RoleSeed.SeedRoles(roleManager);
}
catch (Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occured during migration");
}

app.UseCors("StandardPolicy");

app.UseHttpsRedirection();

app.UseCustomMiddleware();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();