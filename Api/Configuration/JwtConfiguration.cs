namespace Api.Configuration;

public class JwtConfiguration
{
    public string Key { get; set; }
    public int ExpiryInMinutes { get; set; }
}