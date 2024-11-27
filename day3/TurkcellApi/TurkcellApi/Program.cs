using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TurkcellApi.Repositories;
using TurkcellApi.Settings;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddOpenApi();



builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));



builder.Services.AddSingleton<IMongoClient>(cfg =>
{
    var settings = cfg.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
