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
 

 **update record**

 ```bash

    db.categories.updateOne(
        { _id: ObjectId("674468069a06e3fe480d81a1") },
        { $set: { categoryName: "airfood" } }
    )

    db.categories.updateOne(
        { categoryID: 8 },
        { $set: { categoryName: "air_food" } }
    )
 ```

 **find by id**
```bash 
    db.categories.find({ categoryID:8 })
```


**delete by parameter**
```bash
   db.categories.deleteOne(  { 
    categoryName: 'air_food'
  })
```


**filtreleme**
```bash
// id değeri 5'ten büyük olanların listelenmesi
 
db.categories.find({ categoryID: { $gt:5 } })

```


**like sorgusu**
```bash
    // Sweet içeren kayıtları listeler
    db.categories.find({ description: {$regex: /Sweet/} })
    // select * from categories where description like '%sweet%'


    // Sweet / sweet vs. küçük büyük harf farketmez 
    db.categories.find({ description: {$regex: /Sweet/, $options:'i' } }) 
    // select * from categories where description like '%sweet%'


    // categoryNamedeğeri, Products ile biten kayıtların listelenmesi
    db.categories.find({ categoryName: {$regex: /Products$/, $options:'i' } }) 
    // select * from categories where categoryName like '%Products'

    // categoryName değeri, con ile başlayan tüm kayıtların listelenmesi
    db.categories.find({ categoryName: {$regex: /^con/, $options:'i' } }) 
    // select * from categories where categoryName like 'con%'

```





**tüm komedi filmlerinin listelenmesi**
```bash

    // türü içerisinde, comedy olan tüm filmleri tüm datalar ile listeler.
    db.movies.find( { genres: {$in: ['Comedy'] } } )
    // select * from movies where genres in ('Comedy')



    db.movies.find(
        { genres: {$in: ['Comedy'] } },
        { title: 1, directors: 1, writers: 1, _id: 0 } 
    )
    // _id değeri sabittir belirtmediğiniz sürece sorguya dahil olur. var sayılan değer 1'dir, 0 olarak işaretlerseniz gelmeyecektir.
    // select title,directors,writers from movies where genres in ('Comedy')
    

```


tüm kayıtların silinmesi
delete from categories 

koşula göre sil (=) (many)
delete from categories where categoryName = 'air_food'