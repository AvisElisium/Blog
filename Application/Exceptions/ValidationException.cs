using System.Net;

namespace Application.Exceptions;

/// <summary>
/// Class representing validation exception
/// </summary>
public class ValidationException : BaseApplicationException
{
    /// <summary>
    /// Dictionary of validation errors
    /// </summary>
    public IDictionary<string, string[]> ValidationErrors { get; protected set; }
    
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="validationErrors">Dictionary of validation errors/></param>
    public ValidationException(IDictionary<string, string[]> validationErrors) : base("Validation Error")
    {
        ValidationErrors = validationErrors;
        StatusCode = HttpStatusCode.BadRequest;
    }
}