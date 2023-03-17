using Domain.Entities;

namespace Application.Services;

public interface ITokenService
{
    string CreateJwt(User user);
    RefreshToken GenerateRefreshToken();
}