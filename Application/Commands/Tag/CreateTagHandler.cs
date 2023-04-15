using Application.Exceptions;
using Application.Models.Tag;
using AutoMapper;
using FluentValidation;
using Infrastructure;
using MediatR;
using ValidationException = Application.Exceptions.ValidationException;

namespace Application.Commands.Tag;

public class CreateTagHandler : IRequestHandler<CreateTag, Guid>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateTagDto> _validator;

    public CreateTagHandler(AppDbContext context, IMapper mapper, IValidator<CreateTagDto> validator)
    {
        _context = context;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Guid> Handle(CreateTag request, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(request.Dto, cancellationToken);

        if (!result.IsValid) throw new ValidationException(result.ToDictionary());
        
        var tag = _mapper.Map<Domain.Entities.Tag>(request.Dto);
        
        await _context.Tags.AddAsync(tag, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return tag.Id;
    }
}