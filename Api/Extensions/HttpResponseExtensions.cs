using System.Text.Json;
using Application.Models.Pagination;

namespace Api.Extensions;

public static class HttpResponseExtensions
{
    public static void AddPaginationHeader<T>(this HttpResponse response, PagedList<T> pagedList)
    {
        var paginationHeader = new
        {
            CurrentPage = pagedList.CurrentPage,
            TotalItems = pagedList.TotalItems,
            PageSize = pagedList.PageSize,
            TotalPages = pagedList.TotalPages
        };
        
        response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
    }
}