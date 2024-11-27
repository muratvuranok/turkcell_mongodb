using MongoDB.Bson.Serialization.Attributes;

namespace TurkcellApi.Models;

public class Category
{

    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }


    public string CategoryName { get; set; } = null!;
    public string? Description { get; set; }
}
