using NewGoodsManagement.Application.Markdowns;
using NewGoodsManagement.Application.Shops;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddScoped<ShopService>();
builder.Services.AddScoped<MarkdownService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

await app.RunAsync();
