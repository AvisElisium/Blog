using Application.Models.User;
using Application.Services;
using Application.Validators;
using FluentAssertions;
using FluentValidation.TestHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Moq;

namespace UnitTests.Validators;
using static TestHelpers;

public class CreateUserValidatorTests
{
    [Theory]
    [InlineData("TestUsername1", "testemail@test.com", "TestPa$$w0rd")]
    public async Task CreateUserValidator_Validation_Success(string username, string email, string password)
    {
        var dto = new CreateUserDto()
        {
            Username = username,
            Email = email,
            Password = password,
        };
        
        var context = CreateDbContext();
        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var validator = new CreateUserValidator(service);

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }
    
    [Theory]
    [InlineData("t", "testemail@test.com", "TestPa$$w0rd")] // username length < 5
    [InlineData("tasgasgasdsafasfasfasfasf", "testemail@test.com", "TestPa$$w0rd")] // username length > 14
    [InlineData("", "testemail@test.com", "TestPa$$w0rd")] // username empty
    public async Task CreateUserValidator_Validation_Username_Failure(string username, string email, string password)
    {
        var dto = new CreateUserDto()
        {
            Username = username,
            Email = email,
            Password = password,
        };
        
        var context = CreateDbContext();
        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var validator = new CreateUserValidator(service);

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();

        result.ShouldHaveValidationErrorFor(x => x.Username);
        result.ShouldNotHaveValidationErrorFor(x => x.Password);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }
    
    
    [Theory]
    [InlineData("testUsername", "", "TestPa$$w0rd")] // email is empty
    [InlineData("testUsername", "test", "TestPa$$w0rd")] // email is not valid
    public async Task CreateUserValidator_Validation_Email_Failure(string username, string email, string password)
    {
        var dto = new CreateUserDto()
        {
            Username = username,
            Email = email,
            Password = password,
        };
        
        var context = CreateDbContext();
        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var validator = new CreateUserValidator(service);

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();

        result.ShouldHaveValidationErrorFor(x => x.Email);
        result.ShouldNotHaveValidationErrorFor(x => x.Password);
        result.ShouldNotHaveValidationErrorFor(x => x.Username);
    }
    
    [Theory]
    [InlineData("testUsername", "testemail@test.com", "")] // password is empty
    [InlineData("testUsername", "testemail@test.com", "123456")] // password length < 8
    [InlineData("test username", "testemail@test.com", "TestPa$$w0rd")] // username with white space
    [InlineData("test username", "testemail@test.com", "TestPassword1")] // no special character
    [InlineData("test username", "testemail@test.com", "TestPaS4$sword")] // no number
    [InlineData("test username", "testemail@test.com", "testpaS4$sword1")] // no uppercase letter
    public async Task CreateUserValidator_Validation_Password_Failure(string username, string email, string password)
    {
        var dto = new CreateUserDto()
        {
            Username = username,
            Email = email,
            Password = password,
        };
        
        var context = CreateDbContext();
        var service = new UserService(context, new HttpContextAccessor(), new Mock<IAuthorizationService>().Object);
        var validator = new CreateUserValidator(service);

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();

        result.ShouldHaveValidationErrorFor(x => x.Password);
        result.ShouldNotHaveValidationErrorFor(x => x.Email);
        result.ShouldNotHaveValidationErrorFor(x => x.Username);
    }
}