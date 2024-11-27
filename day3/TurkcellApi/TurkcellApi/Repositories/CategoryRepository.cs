using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TurkcellApi.Models;
using TurkcellApi.Settings;

namespace TurkcellApi.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly IMongoCollection<Category> _categories;
    public CategoryRepository(IOptions<MongoDbSettings> mongoSettings, IMongoClient mongoClient)
    {
        var database = mongoClient.GetDatabase(mongoSettings.Value.DatabaseName);
        _categories = database.GetCollection<Category>(mongoSettings.Value.CollectionName);
    }


    public async Task<List<Category>> GetAllAsync() => await _categories.Find(category => true).ToListAsync();

    public async Task<Category> GetByIdAsync(string id) => await _categories.Find(category => category.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Category category) => await _categories.InsertOneAsync(category);

    public async Task UpdateAsync(string id, Category category) => await _categories.ReplaceOneAsync(c => c.Id == id, category);

    public async Task DeleteAsync(string id) => await _categories.DeleteOneAsync(c => c.Id == id);

}
