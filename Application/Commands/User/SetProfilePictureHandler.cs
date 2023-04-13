using Application.Exceptions;
using Application.Services;
using Domain.Entities;
using Infrastructure;
using Infrastructure.services;
using MediatR;

namespace Application.Commands.User;

public class SetProfilePictureHandler : IRequestHandler<SetProfilePicture>
{
    private readonly AppDbContext _context;
    private readonly IImageService _imageService;
    private readonly IUserService _userService;

    public SetProfilePictureHandler(AppDbContext context, IImageService imageService, IUserService userService)
    {
        _context = context;
        _imageService = imageService;
        _userService = userService;
    }
    
    public async Task Handle(SetProfilePicture request, CancellationToken cancellationToken)
    {
        var username = _userService.GetCurrentUserUsername();
        var user = _context.Users.FirstOrDefault(x => x.UserName == username);

        if (user is null) throw new UnauthorizedException();

        var result = await _imageService.UploadImage(request.File);

        var pfp = new ProfilePicture()
        {
            Filename = request.File.FileName,
            PublicId = result.Item1,
            Uri = result.Item2,
            User = user,
            UserUsername = username,
            Alt = $"{username}'s profile picture"
        };

        await _context.ProfilePictures.AddAsync(pfp, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }
}