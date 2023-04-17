namespace Application.Models.Comments;

/// <summary>
/// Dto for deleting Comment entity
/// </summary>
public class DeleteCommentDto
{
    /// <summary>
    /// Id of article under which it was created
    /// </summary>
    public Guid ArticleId { get; set; }
    /// <summary>
    /// To be deleted Comment Id
    /// </summary>
    public Guid CommentId { get; set; }
}