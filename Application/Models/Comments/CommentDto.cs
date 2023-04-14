namespace Application.Models.Comments;

public class CommentDto
{
    public Guid Id { get; set; }
    public string AuthorUsername { get; set; }
    public Uri AuthorProfilePicture { get; set; }
    public Guid ArticleId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}