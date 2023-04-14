using Application.Models.User;

namespace Application.Models.Article;

public class ArticleDto
{
    public Guid Id { get; set; }
    public string Headline { get; set; }
    public string Content { get; set; }
    public string CreatedAt { get; set; }
    public AuthorDto Author { get; set; }
    public Uri  Image { get; set; }
    public bool IsFeatured { get; set; }
}