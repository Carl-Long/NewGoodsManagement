namespace NewGoodsManagement.Application.Markdowns;

public sealed class MarkdownService
{
    public IReadOnlyList<MarkdownItemDto> GetMarkdownItems(Guid shopId, bool includeZeroStock)
    {
        var query = Items.Where(item => item.ShopId == shopId);

        if (!includeZeroStock)
        {
            query = query.Where(item => item.StockQuantity > 0);
        }

        return query
            .Select(item => new MarkdownItemDto(
                item.Id,
                item.Name,
                item.Category,
                item.OriginalPrice,
                item.NewPrice,
                item.DiscountPercentage,
                item.StockQuantity))
            .ToList();
    }

    private sealed record MarkdownItem(
        Guid Id,
        Guid ShopId,
        string Name,
        string Category,
        decimal OriginalPrice,
        decimal NewPrice,
        decimal DiscountPercentage,
        int StockQuantity);

    private static readonly IReadOnlyList<MarkdownItem> Items =
    [
        new(
            Guid.Parse("10000000-0000-0000-0000-000000000001"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Ceramic Mug",
            "Homeware",
            6.00m,
            3.00m,
            50m,
            4),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000002"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Red T-Shirt",
            "Clothing",
            12.00m,
            8.00m,
            33.33m,
            0),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000003"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Paperback Book",
            "Books",
            5.00m,
            2.50m,
            50m,
            7),

        new(
            Guid.Parse("20000000-0000-0000-0000-000000000001"),
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Blue Jacket",
            "Clothing",
            25.00m,
            15.00m,
            40m,
            2),

        new(
            Guid.Parse("20000000-0000-0000-0000-000000000002"),
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Glass Vase",
            "Homeware",
            10.00m,
            6.00m,
            40m,
            0),

        new(
            Guid.Parse("30000000-0000-0000-0000-000000000001"),
            Guid.Parse("33333333-3333-3333-3333-333333333333"),
            "Children's Puzzle",
            "Toys",
            8.00m,
            5.00m,
            37.5m,
            3)
    ];
}
