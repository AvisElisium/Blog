using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Api.Configuration;
using Application.Services;
using Domain.Entities;
using Domain.Enums;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services;

/// <summary>
/// <inheritdoc cref="ITokenService"/>
/// </summary>
public class TokenService : ITokenService
{
    private readonly JwtConfiguration _jwtConfig;

    public TokenService(JwtConfiguration jwtConfig)
    {
        _jwtConfig = jwtConfig;
    }
    
    public string CreateJwt(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, Enum.GetName(typeof(UserTypes), user.UserType)!)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(_jwtConfig.ExpiryInMinutes),
            SigningCredentials = creds,
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public RefreshToken GenerateRefreshToken()
    {
        return new RefreshToken()
        {
            Value = Convert.ToBase64String(Guid.NewGuid().ToByteArray()),
        };
    }
}