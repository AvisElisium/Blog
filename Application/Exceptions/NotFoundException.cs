using System.Net;
using Microsoft.AspNetCore.Http;

namespace Application.Exceptions;

public class NotFoundException : BaseApplicationException
{
    public NotFoundException() : base("Not Found")
    {
        StatusCode = HttpStatusCode.NotFound;
    }
    
    public NotFoundException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.NotFound;
    }
}