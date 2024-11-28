/**
 * @summary Get a category by id
 * @description Bu route bir kategoriyi id'sine göre getirir.
 * @method GET
 * @path /categories/:id
 * @param {string} id - Kategori id'si
 * @returns {Category} Kategori
 */
router.get("/:id", getCategory, async (req, res) => {
  let category;
  try {
    //TODO: middleware  ( id değerine göre kategori bulma işlemi için middleware oluşturulacak)
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Kategori bulunamadı." });
    }
    res.json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
  console.log(req.body);

  /* 


  db.categories.insertMany([
         {
                  "categoryName": "Test Categoriess V1",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V2",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V3",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V4",
                  "description": "Soft, tea"
              }
  
  ])
      const categories = req.body.categories.map((category) => ({ 
      {
          "categories": [
              {
                  "categoryName": "Test Categoriess V1",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V2",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V3",
                  "description": "Soft, tea"
              },
              {
                  "categoryName": "Test Categoriess V4",
                  "description": "Soft, tea"
              }
          ]
      }
    */

  const categories = req.body.map((category) => ({
    /*
      [
        { categoryName: 'Test Categoriess V4', description: 'Soft, tea' },
        { categoryName: 'Test Categoriess V5', description: 'Soft, tea' },
        { categoryName: 'Test Categoriess V6', description: 'Soft, tea' },
        { categoryName: 'Test Categoriess V7', description: 'Soft, tea' }
      ]
      */
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
router.patch("/:id", async (req, res) => {
  category = await Category.findById(req.params.id);
  if (category == null) {
    return res.status(404).json({ message: "Kategori bulunamadı." });
  }

  if (req.body.categoryName != null) {
    category.categoryName = req.body.categoryName;
  }

  if (req.body.description != null) {
    category.description = req.body.description;
  }

  try {
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
