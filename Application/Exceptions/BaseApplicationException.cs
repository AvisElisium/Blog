using System.Net;

namespace Application.Exceptions;

public class BaseApplicationException : Exception
{
    public HttpStatusCode StatusCode { get; protected set; }

    public BaseApplicationException(string message) : base(message)
    {
        
    }
}