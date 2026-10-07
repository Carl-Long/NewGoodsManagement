using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace NewGoodsManagement.Api.Models.Markdowns;

public sealed class MarkdownQueryRequest
{
    [BindRequired]
    public Guid ShopId { get; init; }

    public bool IncludeZeroStock { get; init; }

    [Range(1, int.MaxValue)]
    public int Page { get; init; } = 1;

    [AllowedValues(10, 25, 50, 100)]
    public int PageSize { get; init; } = 25;
}
