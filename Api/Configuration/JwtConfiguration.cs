namespace Api.Configuration;

/// <summary>
/// Class reflecting Jwt Configuration
/// </summary>
public class JwtConfiguration
{
    public string Key { get; set; }
    public int ExpiryInMinutes { get; set; }
}