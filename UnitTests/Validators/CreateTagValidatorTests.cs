using Application.Models.Comments;
using Application.Models.Tag;
using Application.Validators;
using Domain.Entities;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace UnitTests.Validators;
using static TestHelpers;

public class CreateTagValidatorTests
{
    [Theory]
    [InlineData("Test")]
    [InlineData("Test 2")]
    public async Task CreatTag_Success(string name)
    {
        var dto = new CreateTagDto()
        {
            Name = name,
        };
        var context = CreateDbContext();
        var validator = new CreateTagValidator(context);
        
        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }
    
    [Theory]
    [InlineData("Test")]
    [InlineData("T")]
    public async Task CreatTag_Fail(string name)
    {
        var dto = new CreateTagDto()
        {
            Name = name,
        };
        var context = CreateDbContext();

        context.Tags.Add(new Tag()
        {
            Name = "Test",
        });

        await context.SaveChangesAsync();
        
        var validator = new CreateTagValidator(context);
        
        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();
    }
}