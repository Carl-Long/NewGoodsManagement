using NewGoodsManagement.Application.Common;
using NewGoodsManagement.Application.Shops;

namespace NewGoodsManagement.Application.Markdowns;

public sealed class MarkdownService(ShopService shopService)
{
    public PagedResult<MarkdownItemDto>? GetMarkdownItems(Guid shopId, bool includeZeroStock, int page, int pageSize)
    {
        // For now, null indicates that the shop does not exist or is inactive.
        // Once global exception handling is introduced, this can be replaced
        // with an application-specific exception and translated to a 404 centrally.
        if (!shopService.IsActiveShop(shopId)) return null;

        var query = Items.Where(item => item.ShopId == shopId);

        if (!includeZeroStock)
        {
            query = query.Where(item => item.StockQuantity > 0);
        }

        // Because the current source is an in-memory collection, materialise once
        // to avoid multiple-enumeration warnings.
        //
        // When this moves to EF Core/IQueryable, do not materialise the full result
        // set here. Use CountAsync() for the total and then apply Skip/Take before
        // ToListAsync() so pagination happens in the database.
        var filteredItems = query.OrderBy(item => item.Category).ToList();

        var totalCount = filteredItems.Count;

        var items = filteredItems
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(item => new MarkdownItemDto(
                item.Id,
                item.Name,
                item.Category,
                item.OriginalPrice,
                item.NewPrice,
                item.DiscountPercentage,
                item.StockQuantity))
            .ToList();

        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        return new PagedResult<MarkdownItemDto>(items, page, pageSize, totalCount, totalPages);
    }

    // Simulates the undecided domain entity to allow mapping here for now
    private sealed record MarkdownItem(
        Guid Id,
        Guid ShopId,
        string Name,
        string Category,
        decimal OriginalPrice,
        decimal NewPrice,
        decimal DiscountPercentage,
        int StockQuantity);

    // Simulates the markdown items dataset
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
            Guid.Parse("10000000-0000-0000-0000-000000000004"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Desk Lamp",
            "Homeware",
            18.00m,
            12.00m,
            33.33m,
            5),

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
