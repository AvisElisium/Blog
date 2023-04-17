using System.Net;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

/// <summary>
/// Class representing Http 404 Exception
/// </summary>
public class NotFoundException : BaseApplicationException
{
    /// <summary>
    /// Parameterless constructor
    /// </summary>
    public NotFoundException() : base("Not Found")
    {
        StatusCode = HttpStatusCode.NotFound;
    }
    
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="message">Custom message</param>
    public NotFoundException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.NotFound;
    }
}