const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const getCategory = require("../middleware/getCategory");
const multer = require("multer");
const { processCsv } = require("../services/uploadService");

/**
 * @summary Get all categories
 * @description Bu rote tüm kategorileri getirir.
 * @method GET
 * @path /categories
 * @returns {Array<Category>} Tüm kategorilerin listesi
 */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    // .hint("name_and_description_idx");

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @summary Get a category by id
 * @description Bu route bir kategoriyi id'sine göre getirir.
 * @method GET
 * @path /categories/:id
 * @param {string} id - Kategori id'si
 * @returns {Category} Kategori
 */
router.get("/:id", getCategory, async (req, res) => res.send(res.category));

/**
 * @summary Create a new category
 * @description Bu route yeni bir kategori oluşturur.
 * @method POST
 * @path /categories
 * @param {Category} category.body.required - Yeni kategori bilgileri
 * @returns {Category} Yeni oluşturulan kategori
 */

/**
 * @summary Search categories by query
 * @description Bu route kategori adına ve açıklama alanına göre arama yapar.
 * @method GET
 * @path /categories/search
 * @query {string} q- Arama yapılacak kelime
 * @returns {Array<Category>} Arama sonucu kategoriler
 */
router.get("/search/search", async (req, res) => {
  // api/categories/search?q=als
  // api/categories/search?magaza=pasaj&model=ps5
  // const {magaza, model} = req.query; // Query String'den `cname` ve `des` parametrelerini alıyoruz.

  console.log(req.query);

  const { q } = req.query; // Query String'den `q` parametresini alıyoruz.

  if (!q) {
    return res
      .status(400)
      .json({ message: "Arama yapmak için bir kelime girmelisiniz." });
  }

  try {
    const explainData = await Category.find({
      $or: [
        { categoryName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    })
      .hint("name_and_description_idx")
      .explain("executionStats");

    console.log(explainData);

    const categories = await Category.find({
      $or: [
        { categoryName: { $regex: q, $options: "i" } }, // i -> büyük, küçük harf duyarlılığı olmadan arama yapar
        { description: { $regex: q, $options: "i" } }, // i -> büyük, küçük harf duyarlılığı olmadan arama yapar
      ],
    }).hint("name_and_description_idx");

    res.json({
      categories: categories,
      executionStats: explainData.executionStats,
    }); // arama kriterlerine uyan kayıtlar geriye döner
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  // create new category object

  const category = new Category({
    categoryName: req.body.categoryName,
    description: req.body.description,
    // createdDate -> default olarak atanacağı için burada belirtmeye gerek yok
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @summary Upload a csv file to bulk insert categories
 * @description Bu route csv dosyasını okuyarak toplu kategori ekler.
 * @method POST
 * @path /categories/upload
 * @param {file} file.body.required - Kategori listesini içeren csv dosyası
 * @returns {Array<Category>} Eklenen kategoriler
 */

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
 
  const filePath = req.file.path;

  try {
    const insertedCategories = await processCsv(filePath);
    res.status(201).json(insertedCategories);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @summary Bulk insert categories
 * @description Bu route toplu kategori ekler.
 * @method POST
 * @path /categories/bulk
 * @param {Array<Category>} categories.body.required - Kategori listesi
 * @returns {Array<Category>} Eklenen kategoriler
 */

router.post("/bulk", async (req, res) => {
  const categories = req.body.map((category) => ({
    categoryName: category.categoryName,
    description: category.description,
  }));

  try {
    const insertedCategories = await Category.insertMany(categories);
    res.status(201).json(insertedCategories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @summary Update a category
 * @description Bu route bir kategoriyi günceller.
 * @method PATCH
 * @path /categories/:id
 * @param {string} id - Kategori id'si (url)
 * @param {Category} category.body.required - Güncellenecek kategori bilgileri (req.body)
 * @returns {Category} Güncellenen kategori
 */
router.patch("/:id", getCategory, async (req, res) => {
  if (req.body.categoryName != null) {
    res.category.categoryName = req.body.categoryName;
  }

  if (req.body.description != null) {
    res.category.description = req.body.description;
  }

  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @summary Delete a category
 * @description Bu route bir kategoriyi siler.
 * @method DELETE
 * @path /categories/:id
 * @param {string} id - Kategori id'si
 * @returns {string} Silinen kategori id'si
 */
router.delete("/:id", getCategory, async (req, res) => {
  try {
    await res.category.deleteOne();
    // res.json({ message: "Category deleted" });
    res.json({
      _id: res.category._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
