using System.Net;

namespace Application.Exceptions;

/// <summary>
/// Class representing 403 Http exception
/// </summary>
public class ForbiddenException : BaseApplicationException
{
    /// <summary>
    /// Parameterless constructor
    /// </summary>
    public ForbiddenException() : base("Forbidden")
    {
        StatusCode = HttpStatusCode.Forbidden;
    }
    
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="message">Custom message</param>
    public ForbiddenException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.Forbidden;
    }
}