using System.Net;

namespace Application.Exceptions;

public class UnauthorizedException : BaseApplicationException
{
    public UnauthorizedException() : base("Unauthorized")
    {
        StatusCode = HttpStatusCode.Unauthorized;
    }
    
    public UnauthorizedException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.Unauthorized;
    }
}