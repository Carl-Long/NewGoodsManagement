using NewGoodsManagement.Application.Markdowns;
using NewGoodsManagement.Application.Shops;

var builder = WebApplication.CreateBuilder(args);

const string frontendCorsPolicy = "Frontend";

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddSingleton<ShopService>();
builder.Services.AddSingleton<MarkdownService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(frontendCorsPolicy);

app.MapControllers();

app.Run();
