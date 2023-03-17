using System.Net;

namespace Application.Exceptions;

public class ForbiddenException : BaseApplicationException
{
    public ForbiddenException() : base("Forbidden")
    {
        StatusCode = HttpStatusCode.Forbidden;
    }
    
    public ForbiddenException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.Forbidden;
    }
}