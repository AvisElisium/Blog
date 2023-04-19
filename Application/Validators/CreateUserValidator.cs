using Application.Models.User;
using Application.Services;
using FluentValidation;

namespace Application.Validators;

/// <summary>
/// Validator for <see cref="CreateUserValidator"/>
/// </summary>
public class CreateUserValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserValidator(IUserService userService)
    {
        RuleFor(x => x.Email)
            .MustAsync(userService.IsUniqueEmailAsync).WithMessage("Email is already taken.")
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("Valid email address is required.");

        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.")
            .Must(username => !username.Any(char.IsWhiteSpace))
            .MustAsync(userService.IsUniqueUsernameAsync).WithMessage("Username is already taken.")
            .MinimumLength(5).WithMessage("Username must be at least 5 characters long.")
            .MaximumLength(14).WithMessage("Username can be up to 14 characters long.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches("([A-Z])")
            .NotEmpty()
            .MinimumLength(8)
            .Matches("[A-Z]").WithMessage("Password must contain one or more capital letters.")
            .Matches("[a-z]").WithMessage("Password must contain one or more lowercase letters.")
            .Matches(@"\d").WithMessage("Password must contain one or more digits.")
            .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("Password must contain one or more special characters.")
            .Matches("^[^£# “”]*$").WithMessage("Password must not contain the following characters £ # “” or spaces.");
    }
}