namespace Application.Models.Comments;

/// <summary>
/// Dto for creating Comment entity
/// </summary>
public class CreateCommentDto
{
    /// <summary>
    /// Id of Article under which it was created
    /// </summary>
    public Guid ArticleId { get; set; }
    /// <summary>
    /// To be created Comment content
    /// </summary>
    public string Content { get; set; }
}