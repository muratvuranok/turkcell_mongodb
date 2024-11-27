namespace TurkcellApi.Settings;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = default!;
    public string DatabaseName { get; set; } = default!;
    public string CollectionName { get; set; } = default!;
}
