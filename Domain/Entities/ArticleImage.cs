namespace Domain.Entities;

public class ArticleImage : Image
{
    public Guid ArticleId { get; set; }
    public Article Article { get; set; }
}