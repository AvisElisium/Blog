using Application.Models.User;
using AutoMapper;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ValidationException = Application.Exceptions.ValidationException;

namespace Application.Commands.User;

/// <summary>
/// <see cref="CreateNewUser"/> handler
/// </summary>
public class CreateNewUserHandler : IRequestHandler<CreateNewUser>
{
    private readonly AppDbContext _context;
    private readonly UserManager<Domain.Entities.User> _userManager;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserDto> _validator;

    public CreateNewUserHandler(AppDbContext context, UserManager<Domain.Entities.User> userManager, IMapper mapper,
        IValidator<CreateUserDto> validator)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task Handle(CreateNewUser request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Dto, cancellationToken);

        if (!validationResult.IsValid) throw new ValidationException(validationResult.ToDictionary());
            
        var user = _mapper.Map<CreateUserDto, Domain.Entities.User>(request.Dto);

        var result = await _userManager.CreateAsync(user, request.Dto.Password);

        if (!result.Succeeded) throw new Exception("Error occured during user creation");
    }
}