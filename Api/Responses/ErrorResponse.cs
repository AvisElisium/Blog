namespace Api.Responses;

/// <summary>
/// Response type for standard error
/// </summary>
public class ErrorResponse
{
    public string Message { get; set; }
    public string? StackTrace { get; set; }
}