using Microsoft.AspNetCore.Mvc;
using NewGoodsManagement.Application.Markdowns;

namespace NewGoodsManagement.Api.Controllers;

[ApiController]
[Route("api/markdowns")]
public sealed class MarkdownsController(MarkdownService markdownService) : ControllerBase
{
    [HttpGet("{shopId:guid}")]
    public ActionResult<IReadOnlyList<MarkdownItemDto>> GetMarkdownItems(Guid shopId, [FromQuery] bool includeZeroStock = false)
    {
        var items = markdownService.GetMarkdownItems(shopId, includeZeroStock);
        return Ok(items);
    }
}
