using System.Net;

namespace Application.Exceptions;

/// <summary>
/// Base class for custom application exceptions
/// </summary>
public abstract class BaseApplicationException : Exception
{
    /// <summary>
    /// Http representation of exception
    /// </summary>
    public HttpStatusCode StatusCode { get; protected set; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="message">Exception message</param>
    public BaseApplicationException(string message) : base(message)
    {
        
    }
}