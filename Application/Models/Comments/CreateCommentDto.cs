namespace Application.Models.Comments;

public class CreateCommentDto
{
    public Guid ArticleId { get; set; }
    public string Content { get; set; }
}