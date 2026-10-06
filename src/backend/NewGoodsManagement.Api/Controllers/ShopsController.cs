using Microsoft.AspNetCore.Mvc;
using NewGoodsManagement.Application.Shops;

namespace NewGoodsManagement.Api.Controllers;

[ApiController]
[Route("api/shops")]
public sealed class ShopsController(ShopService shopService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<ShopOptionDto>> GetShops([FromQuery] string? search = null)
    {
        var shops = shopService.GetShops(search);
        return Ok(shops);
    }

    [HttpGet("{shopId:guid}")]
    public ActionResult<ShopOptionDto> GetShop(Guid shopId)
    {
        var shop = shopService.GetShop(shopId);

        if (shop is null) return NotFound();

        return Ok(shop);
    }
}
