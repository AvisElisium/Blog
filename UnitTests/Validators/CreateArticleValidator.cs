using Application.Models.Article;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace UnitTests.Validators;

public class CreateArticleValidator
{
    [Theory]
    [InlineData("test headline", "test content")]
    public async Task CreateArticleValidator_Validation_Success(string headline, string content)
    {
        var article = new CreateArticleDto()
        {
            Content = content,
            Headline = headline,
        };

        var validator = new Application.Validators.CreateArticleValidator();

        var result = validator.TestValidate(article);

        result.Errors.Should().BeEmpty();
        result.IsValid.Should().BeTrue();
    }
    
    
    [Theory]
    [InlineData("", "test content")]
    public async Task CreateArticleValidator_Validation_Headline_Failure(string headline, string content)
    {
        var article = new CreateArticleDto()
        {
            Content = content,
            Headline = headline,
        };

        var validator = new Application.Validators.CreateArticleValidator();

        var result = validator.TestValidate(article);

        result.ShouldHaveValidationErrorFor(x => x.Headline);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Content);
    }
    
    [Theory]
    [InlineData("Test headline", "")]
    public async Task CreateArticleValidator_Validation_Content_Failure(string headline, string content)
    {
        var article = new CreateArticleDto()
        {
            Content = content,
            Headline = headline,
        };

        var validator = new Application.Validators.CreateArticleValidator();

        var result = validator.TestValidate(article);

        result.ShouldHaveValidationErrorFor(x => x.Content);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Headline);
    }
}