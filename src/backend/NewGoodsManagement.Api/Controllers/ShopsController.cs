using Microsoft.AspNetCore.Mvc;
using NewGoodsManagement.Application.Shops;

namespace NewGoodsManagement.Api.Controllers;

[ApiController]
[Route("api/shops")]
public sealed class ShopsController(ShopService shopService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<ShopOptionDto>> GetShopOptions([FromQuery] string? search = null)
    {
        var shops = shopService.GetShops(search);
        return Ok(shops);
    }

    [HttpGet("{id:guid}")]
    public ActionResult<ShopOptionDto> GetShopOption(Guid id)
    {
        var shop = shopService.GetShop(id);

        if (shop is null) return NotFound();

        return Ok(shop);
    }
}
