namespace NewGoodsManagement.Application.Shops;

public sealed class ShopService
{
    public IReadOnlyList<ShopOptionDto> GetShops(string? search)
    {
        var query = Shops.Where(shop => shop.IsActive);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var searchTerm = search.Trim();

            query = query.Where(shop =>
                shop.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                shop.Code.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
        }

        return query.Select(shop => new ShopOptionDto(shop.Id, shop.Name, shop.Code)).ToList();
    }

    public ShopOptionDto? GetShop(Guid id)
    {
        return Shops
            .Where(shop => shop.IsActive)
            .Where(shop => shop.Id == id)
            .Select(shop => new ShopOptionDto(shop.Id, shop.Name, shop.Code))
            .FirstOrDefault();
    }

    public bool IsActiveShop(Guid id)
    {
        return Shops.Any(shop => shop.Id == id && shop.IsActive);
    }

    // Simulates domain entity that is not decided yet
    private sealed record Shop(Guid Id, string Name, string Code, bool IsActive);

    // Simulates shop dataset
    private static readonly IReadOnlyList<Shop> Shops =
    [
        new(
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Oxford",
            "OXF001",
            true),

        new(
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Oxford Headington",
            "OXH002",
            true),

        new(
            Guid.Parse("33333333-3333-3333-3333-333333333333"),
            "Reading",
            "REA003",
            true),

        new(
            Guid.Parse("44444444-4444-4444-4444-444444444444"),
            "Swindon",
            "SWI004",
            true),

        new(
            Guid.Parse("55555555-5555-5555-5555-555555555555"),
            "Bristol",
            "BRI005",
            true),

        new(
            Guid.Parse("66666666-6666-6666-6666-666666666666"),
            "Bath",
            "BAT006",
            true),

        new(
            Guid.Parse("77777777-7777-7777-7777-777777777777"),
            "Cheltenham",
            "CHE007",
            true),

        new(
            Guid.Parse("88888888-8888-8888-8888-888888888888"),
            "Gloucester",
            "GLO008",
            true),

        new(
            Guid.Parse("99999999-9999-9999-9999-999999999999"),
            "Cardiff",
            "CAR009",
            true),

        new(
            Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
            "Newport",
            "NEW010",
            true),

        new(
            Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
            "Closed Test Shop",
            "CLS999",
            false)
    ];
}
