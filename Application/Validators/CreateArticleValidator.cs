using Application.Models.Article;
using FluentValidation;

namespace Application.Validators;

/// <summary>
/// Validator for <see cref="CreateArticleDto"/>
/// </summary>
public class CreateArticleValidator : AbstractValidator<CreateArticleDto>
{
    public CreateArticleValidator()
    {
        RuleFor(x => x.Headline)
            .NotEmpty().WithMessage("Headline is required");

        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Content is required");
    }
}