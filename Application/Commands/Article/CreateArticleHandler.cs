using Application.Exceptions;
using Application.Models.Article;
using Application.Services;
using AutoMapper;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ValidationException = Application.Exceptions.ValidationException;

namespace Application.Commands.Article;

public class CreateArticleHandler : IRequestHandler<CreateArticle, Guid>
{
    private readonly AppDbContext _context;
    private readonly UserManager<Domain.Entities.User> _userManager;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateArticleDto> _validator;

    public CreateArticleHandler(AppDbContext context, UserManager<Domain.Entities.User> userManager, IUserService userService,
        IMapper mapper, IValidator<CreateArticleDto> validator)
    {
        _context = context;
        _userManager = userManager;
        _userService = userService;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Guid> Handle(CreateArticle request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Dto, cancellationToken);

        if (!validationResult.IsValid) throw new ValidationException(validationResult.ToDictionary());
        
        var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.UserName == _userService.GetCurrentUserUsername(), cancellationToken);

        if (user is null) throw new UnauthorizedException();

        var article = _mapper.Map<CreateArticleDto, Domain.Entities.Article>(request.Dto);
        article.Author = user;

        var result = await _userService.AuthorizeUserAsync(article, Operations.Update);
        
        if (!result) throw new ForbiddenException($"You don't have permission to create Article");

        await _context.AddAsync(article, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return article.Id;
    }
}