namespace Application.Models.Article;

/// <summary>
/// Dto for Article author
/// </summary>
public class AuthorDto
{
    /// <summary>
    /// Username of Author
    /// </summary>
    public string Username { get; set; }
    /// <summary>
    /// Uri to Author's ProfilePicture
    /// </summary>
    public Uri ProfilePicture { get; set; }
}