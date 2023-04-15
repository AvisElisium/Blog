using Application.Models.Tag;
using FluentValidation;
using Infrastructure;

namespace Application.Validators;

public class CreateTagValidator : AbstractValidator<CreateTagDto>
{
    public CreateTagValidator(AppDbContext dbContext)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(3)
            .Custom((val, context) =>
            {
                var result = dbContext.Tags.Any(x => x.Name == val);

                if (result) context.AddFailure("Tag with this name already exists");
            });
    }
}