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
        // Oxford
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
            Guid.Parse("10000000-0000-0000-0000-000000000005"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Black Handbag",
            "Accessories",
            20.00m,
            12.00m,
            40m,
            3),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000006"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Board Game",
            "Toys",
            15.00m,
            9.00m,
            40m,
            6),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000007"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Canvas Print",
            "Homeware",
            14.00m,
            7.00m,
            50m,
            2),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000008"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Denim Jeans",
            "Clothing",
            22.00m,
            14.00m,
            36.36m,
            4),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000009"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Glass Bowl",
            "Homeware",
            8.00m,
            4.00m,
            50m,
            8),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000010"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Green Jumper",
            "Clothing",
            16.00m,
            10.00m,
            37.5m,
            1),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000011"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Kitchen Clock",
            "Homeware",
            11.00m,
            6.00m,
            45.45m,
            3),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000012"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Leather Belt",
            "Accessories",
            9.00m,
            5.00m,
            44.44m,
            0),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000013"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Photo Frame",
            "Homeware",
            7.00m,
            3.50m,
            50m,
            9),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000014"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Running Shoes",
            "Footwear",
            30.00m,
            18.00m,
            40m,
            2),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000015"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Striped Scarf",
            "Accessories",
            10.00m,
            6.00m,
            40m,
            5),

        new(
            Guid.Parse("10000000-0000-0000-0000-000000000016"),
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Wooden Tray",
            "Homeware",
            13.00m,
            8.00m,
            38.46m,
            4),

        // Oxford Headington
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

        // Reading
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
