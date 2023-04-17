using Microsoft.EntityFrameworkCore;

namespace Application.Models.Pagination;

/// <summary>
/// Implementation of <see cref="List{T}"/> for pagination
/// </summary>
/// <typeparam name="T">Type of resource</typeparam>
public class PagedList<T> : List<T>
{
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int PageSize { get; private set; }
    public int TotalItems { get; private set; }

    protected internal PagedList(int currentPage, int pageSize, int totalItems, List<T> items)
    {
        CurrentPage = currentPage;
        TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        PageSize = pageSize;
        TotalItems = totalItems;
        AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        
        var items = await source
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedList<T>(pageNumber, pageSize, count, items);
    }
}