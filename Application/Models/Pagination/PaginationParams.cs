using Microsoft.Extensions.Configuration;

namespace Application.Models.Pagination;

/// <summary>
/// Pagination Query Parameters
/// </summary>
public class PaginationParams
{
    private const int MaxPageSize = 50;
    private int _pageNumber = 1;
    private int _pageSize = 10;

    public int PageNumber
    {
        get => _pageNumber;
        set => _pageNumber = (value < 1) ? 1 : value;
    }

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value < MaxPageSize) ? value : MaxPageSize;
    }

    public void Deconstruct(out int pageNumber, out int pageSize)
    {
        pageNumber = PageNumber;
        pageSize = PageSize;
    }
}