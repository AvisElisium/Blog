using Application.Models.User;
using Application.Services;
using FluentValidation;
using FluentValidation.Results;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ValidationException = Application.Exceptions.ValidationException;

namespace Application.Commands.User;

public class ChangePasswordHandler : IRequestHandler<ChangePassword>
{
    private readonly AppDbContext _context;
    private readonly UserManager<Domain.Entities.User> _userManager;
    private readonly IUserService _userService;
    private readonly IValidator<ChangePasswordDto> _validator;

    public ChangePasswordHandler(AppDbContext context, UserManager<Domain.Entities.User> userManager, IUserService userService, IValidator<ChangePasswordDto> validator)
    {
        _context = context;
        _userManager = userManager;
        _userService = userService;
        _validator = validator;
    }
    
    public async Task Handle(ChangePassword request, CancellationToken cancellationToken)
    {
        var username = _userService.GetCurrentUserUsername();
        var user = _context.Users.FirstOrDefault(x => x.UserName == username);

        var validationResult = await _validator.ValidateAsync(request.Dto, cancellationToken);

        var result = await _userManager.ChangePasswordAsync(user, request.Dto.CurrentPassword, request.Dto.NewPassword);

        if (!result.Succeeded)
        {
            validationResult.Errors.Add(new ValidationFailure("CurrentPassword", "Incorrect Password"));
            throw new ValidationException(validationResult.ToDictionary());
        }
    }
}