namespace Application.Models.Comments;

/// <summary>
/// Dto for Comment entity
/// </summary>
public class CommentDto
{
    /// <summary>
    /// Id of Comment
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Username of User which created it
    /// </summary>
    public string AuthorUsername { get; set; }
    /// <summary>
    /// Uri to ProfilePicture of User which created it
    /// </summary>
    public Uri AuthorProfilePicture { get; set; }
    /// <summary>
    /// Id of article under which it was created
    /// </summary>
    public Guid ArticleId { get; set; }
    /// <summary>
    /// Content of Comment
    /// </summary>
    public string Content { get; set; }
    /// <summary>
    /// Time of creation
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}