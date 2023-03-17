using System.Net;

namespace Application.Exceptions;

public class ValidationException : BaseApplicationException
{
    public IDictionary<string, string[]> ValidationErrors { get; protected set; }
    
    public ValidationException(IDictionary<string, string[]> validationErrors) : base("Validation Error")
    {
        ValidationErrors = validationErrors;
        StatusCode = HttpStatusCode.BadRequest;
    }
}