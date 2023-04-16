namespace Application.Models.Article;

public class ArticleListQueryParams
{
    public List<string>? CreatedBy { get; set; }
    public List<string>? Tags { get; set; }
    public DateTime? CreatedBefore { get; set; }
    public DateTime? CreatedAfter { get; set; }
    public bool? featured { get; set; }
}