const fs = require("fs");
const csvParser = require("csv-parser");
const Category = require("../models/Category");

async function processCsv(filePath) {
  return new Promise((resolve, reject) => {
    const categories = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        console.log(row);

        categories.push({
          categoryName: row.categoryName,
          description: row.description,
        });
      })
      
      .on("end", async () => {
        try {
          // database'e ekleme işlemi
          const insertedCategories = await Category.insertMany(categories);
          resolve(insertedCategories);
        } catch (err) {
          reject(err);
        } finally {
          fs.unlinkSync(filePath);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = { processCsv };
