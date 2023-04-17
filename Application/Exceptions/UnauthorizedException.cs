using System.Net;

namespace Application.Exceptions;

/// <summary>
/// Class representing Http 401 exception
/// </summary>
public class UnauthorizedException : BaseApplicationException
{
    /// <summary>
    /// Parameterless constructor
    /// </summary>
    public UnauthorizedException() : base("Unauthorized")
    {
        StatusCode = HttpStatusCode.Unauthorized;
    }
    
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="message">Custom message</param>
    public UnauthorizedException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.Unauthorized;
    }
}