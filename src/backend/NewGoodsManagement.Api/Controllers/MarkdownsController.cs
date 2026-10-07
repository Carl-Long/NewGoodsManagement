using Microsoft.AspNetCore.Mvc;
using NewGoodsManagement.Api.Models.Markdowns;
using NewGoodsManagement.Application.Common;
using NewGoodsManagement.Application.Markdowns;

namespace NewGoodsManagement.Api.Controllers;

[ApiController]
[Route("api/markdowns")]
public sealed class MarkdownsController(MarkdownService markdownService) : ControllerBase
{
    [HttpGet]
    public ActionResult<PagedResult<MarkdownItemDto>> GetMarkdownItems([FromQuery] MarkdownQueryRequest query)
    {
        var result = markdownService.GetMarkdownItems(query.ShopId, query.IncludeZeroStock, query.Page, query.PageSize);

        // Temporary handling while the service returns null for an inactive
        // or unknown shop. Once global exception handling is introduced,
        // this branch can be removed and the handler can return the 404.
        if (result is null) return NotFound();

        return Ok(result);
    }
}
