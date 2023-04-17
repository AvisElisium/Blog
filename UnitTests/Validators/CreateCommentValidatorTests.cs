using Application.Models.Comments;
using Application.Validators;
using FluentAssertions;
using FluentValidation.TestHelper;
using static UnitTests.TestHelpers;

namespace UnitTests.Validators;

public class CreateCommentValidatorTests
{
    [Theory]
    [InlineData("<p>test</p>")]
    [InlineData("<p><img src=\"test.png\"></p>")]
    public async Task CreateComment_Success(string content)
    {
        var dto = new CreateCommentDto()
        {
            Content = content
        };

        var validator = new CreateCommentValidator();

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Theory]
    [InlineData("<p></p>")]
    public async Task CreateComment_Fail(string content)
    {
        var dto = new CreateCommentDto()
        {
            Content = content
        };

        var validator = new CreateCommentValidator();

        var result = await validator.TestValidateAsync(dto);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().NotBeEmpty();
    }
}