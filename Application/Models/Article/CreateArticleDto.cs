namespace Application.Models.Article;

public class CreateArticleDto
{
    public string Headline { get; set; }
    public string Content { get; set; }
    public bool IsFeatured { get; set; }
}