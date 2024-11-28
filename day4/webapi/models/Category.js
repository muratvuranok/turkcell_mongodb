const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String, // kategori adının string olacağını belirttik
      required: true, // kategori adının zorunlu olacağını belirttik
      unique: true, // kategori adının benzersiz olacağını belirttik
    },
    description: {
      type: String, // kategori açıklamasının string olacağını belirttik
      required: false, // kategori açıklamasının zorunlu değildir
      default: "default bu değer yer alacak", // kategori açıklamasının varsayılan değeri boş olacağını belirttik
    },
    createdDate: {
      type: Date, // kategori oluşturulma tarihinin date olacağını belirttik
      required: true, // kategori oluşturulma tarihinin zorunlu olacağını belirttik
      default: Date.now, // kategori oluşturulma tarihinin varsayılan değeri şu anki tarih olacağını belirttik
    },
  },
  { collection: "categories" } // kategorilerin kaydedileceği koleksiyon adını belirttik
);

// categoryname alanı için, artan sırada bir index tanımladık.
// db.categories.createIndex({categoryName : 1 },{name:'categoryName_idx'})
// categorySchema.index({ description: -1 }, { name: "description_idx" });

categorySchema.index(
  { categoryName: 1, description: -1 },
  { name: "name_and_description_idx" }
);

// Modelin export edilmesi
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
