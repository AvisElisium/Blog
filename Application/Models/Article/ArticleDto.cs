using Application.Models.Tag;
using Application.Models.User;

namespace Application.Models.Article;

public class ArticleDto
{
    public Guid Id { get; set; }
    public string Headline { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public AuthorDto Author { get; set; }
    public Uri  Image { get; set; }
    public bool IsFeatured { get; set; }
    public List<TagDto> Tags { get; set; }
}