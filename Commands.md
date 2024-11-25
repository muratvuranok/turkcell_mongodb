**mongodb server çalıştırma**
```bash
    mongod --bind_ip_all
```

**mongo shell çalıştırmak için**
```bash
    mongosh
```


**tüm database'lerin listelenmesi**
```bash
    show dbs
```

**veri tabanı seçme işlemi**
```bash
   use <databasename>
```

**collection (table) seçimi**
```bash
    show collections
```

**Categoris collection içerisine tekil kayıt ekleme**
```bash
    db.categories.insertOne({
        "name": "beverages",
        "description": "Contains a list of beverages"
    })
```

**tüm dataların listelenmesi**
```bash 
    db.categories.find()

    // formatlı bir veri listeler
    db.categories.find().pretty()
```


**insert**

```bash 
db.categories.insertOne({
    "name": "beverages",
    "description": "Contains a list of beverages"
})
```

**bulk insert**

```bash 
db.categories.insertMany([
    {
        "categoryID": 1,
        "categoryName": "Beverages",
        "description": "Soft drinks, coffees, teas, beers, and ales"
    },
    {
        "categoryID": 2,
        "categoryName": "Condiments",
        "description": "Sweet and savory sauces, relishes, spreads, and seasonings"
    },
    {
        "categoryID": 3,
        "categoryName": "Confections",
        "description": "Desserts, candies, and sweet breads"
    },
    {
        "categoryID": 4,
        "categoryName": "Dairy Products",
        "description": "Cheeses"
    },
    {
        "categoryID": 5,
        "categoryName": "Grains/Cereals",
        "description": "Breads, crackers, pasta, and cereal"
    },
    {
        "categoryID": 6,
        "categoryName": "Meat/Poultry",
        "description": "Prepared meats"
    },
    {
        "categoryID": 7,
        "categoryName": "Produce",
        "description": "Dried fruit and bean curd"
    },
    {
        "categoryID": 8,
        "categoryName": "Seafood",
        "description": "Seaweed and fish"
    }
])
```
 