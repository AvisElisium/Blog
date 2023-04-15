namespace Domain.Entities;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool IsFeatured { get; set; } = false;
    public ICollection<Article> Articles { get; set; } = new List<Article>();
}