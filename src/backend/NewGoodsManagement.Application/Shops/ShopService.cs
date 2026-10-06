namespace NewGoodsManagement.Application.Shops;

public sealed class ShopService
{
    public IReadOnlyList<ShopOptionDto> GetShops(string? search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return Shops;
        }

        var term = search.Trim();

        return Shops
            .Where(shop =>
                shop.Name.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                shop.Code.Contains(term, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }

    public ShopOptionDto? GetShop(Guid shopId)
    {
        return Shops.FirstOrDefault(shop => shop.Id == shopId);
    }

    private static readonly IReadOnlyList<ShopOptionDto> Shops =
    [
        new(
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            "Oxford",
            "OXF001"),

        new(
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            "Oxford Headington",
            "OXH002"),

        new(
            Guid.Parse("33333333-3333-3333-3333-333333333333"),
            "Reading",
            "REA003"),

        new(
            Guid.Parse("44444444-4444-4444-4444-444444444444"),
            "Swindon",
            "SWI004"),

        new(
            Guid.Parse("55555555-5555-5555-5555-555555555555"),
            "Bristol",
            "BRI005"),

        new(
            Guid.Parse("66666666-6666-6666-6666-666666666666"),
            "Bath",
            "BAT006"),

        new(
            Guid.Parse("77777777-7777-7777-7777-777777777777"),
            "Cheltenham",
            "CHE007"),

        new(
            Guid.Parse("88888888-8888-8888-8888-888888888888"),
            "Gloucester",
            "GLO008"),

        new(
            Guid.Parse("99999999-9999-9999-9999-999999999999"),
            "Cardiff",
            "CAR009"),

        new(
            Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
            "Newport",
            "NEW010"),
    ];
}
