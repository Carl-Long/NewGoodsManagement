namespace NewGoodsManagement.Application.Markdowns;

public sealed record MarkdownItemDto(
    Guid Id,
    string Name,
    string Category,
    decimal OriginalPrice,
    decimal NewPrice,
    decimal DiscountPercentage,
    int StockQuantity);
