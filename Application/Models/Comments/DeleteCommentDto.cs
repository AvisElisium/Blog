namespace Application.Models.Comments;

public class DeleteCommentDto
{
    public Guid ArticleId { get; set; }
    public Guid CommentId { get; set; }
}