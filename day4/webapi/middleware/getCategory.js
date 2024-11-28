const Category = require("../models/Category");

/**
 * @summary Get a category by id middleware
 * @description Bu middleware bir kategoriyi id'sine göre getirir.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {Category} Kategori
 */
async function getCategory(req, res, next) {
  let category;

  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Kategori bulunamadı." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.category = category;
  // bir sonraki middleware'e geç
  next();
}

module.exports = getCategory;
