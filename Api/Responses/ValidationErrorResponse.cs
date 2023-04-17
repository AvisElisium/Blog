namespace Api.Responses;

/// <summary>
/// Response type for validation error
/// </summary>
public class ValidationErrorResponse : ErrorResponse
{
    public IDictionary<string, string[]> ValidationErrors { get; set; }
}