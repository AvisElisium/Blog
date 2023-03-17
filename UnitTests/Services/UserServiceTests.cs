using Application.Services;
using Domain.Entities;
using FluentAssertions;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit.Abstractions;
using static UnitTests.TestHelpers;

namespace UnitTests.Services;

public class UserServiceTests
{
    

    [Theory]
    [InlineData("testemail1@test.com")]
    [InlineData("testemail2@test.com")]
    [InlineData("testemail3@test.com")]
    public async Task IsUniqueEmailAsync_Returns_True(string email)
    {
        await using var context = CreateDbContext();
        var cancellationToken = new CancellationToken();
        
        var user = new User()
        {
            UserName = "asd",
            Email = "asfsaf@test.com",
        };

        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var result = await service.IsUniqueEmailAsync(email, cancellationToken);

        result.Should().BeTrue();
    }
    
    [Theory]
    [InlineData("testemail1@test.com")]
    [InlineData("testemail2@test.com")]
    [InlineData("testemail3@test.com")]
    public async Task IsUniqueEmailAsync_Returns_False(string email)
    {
        await using var context = CreateDbContext();
        var cancellationToken = new CancellationToken();

        var users = new List<User>()
        {
            new User()
            {
                Email = "testemail1@test.com",
            },
            new User()
            {
                Email = "testemail2@test.com",
            },
            new User()
            {
                Email = "testemail3@test.com",
            },
        };

        await context.AddRangeAsync(users, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        

        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var result = await service.IsUniqueEmailAsync(email, cancellationToken);

        result.Should().BeFalse();
    }
    
    [Theory]
    [InlineData("TestUsername1")]
    [InlineData("TestUsername2")]
    [InlineData("TestUsername3")]
    public async Task IsUniqueUsernameAsync_Returns_True(string username)
    {
        await using var context = CreateDbContext();
        var cancellationToken = new CancellationToken();

        var users = new List<User>()
        {
            new User()
            {
                UserName = "asdsadasd",
            },
            new User()
            {
                UserName = "asasdd",
            },
            new User()
            {
                UserName = "asd",
            },
        };

        await context.AddRangeAsync(users, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        

        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var result = await service.IsUniqueUsernameAsync(username, cancellationToken);

        result.Should().BeTrue();
    }
    
    [Theory]
    [InlineData("TestUsername1")]
    [InlineData("TestUsername2")]
    [InlineData("TestUsername3")]
    public async Task IsUniqueUsernameAsync_Returns_False(string username)
    {
        await using var context = CreateDbContext();
        var cancellationToken = new CancellationToken();

        var users = new List<User>()
        {
            new User()
            {
                UserName = "TestUsername1",
            },
            new User()
            {
                UserName = "TestUsername2",
            },
            new User()
            {
                UserName = "TestUsername3",
            },
        };

        await context.AddRangeAsync(users, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        

        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var result = await service.IsUniqueUsernameAsync(username, cancellationToken);

        result.Should().BeFalse();
    }
    
}