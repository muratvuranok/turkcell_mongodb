
# Sample 2: Kategorisi Western Olan Filmlerin Ortalama Süresi

Bu sorgu, Western kategorisindeki filmlerin ortalama süresini hesaplar ve bu filmlere ait yorumları içerir.

## Açıklama

1. **`$match`**: Yalnızca 2014 yılından sonra yapılmış ve `genres` alanında "Western" türü bulunan filmleri filtreler.
   - Birden fazla türü kontrol etmek için `$in` kullanılabilir (örnek: `{ "genres": { "$in": ["Western", "Drama"] } }`).
2. **`$lookup`**: Filmler (`movies` koleksiyonu) ile yorumlar (`comments` koleksiyonu) arasında birleştirme yapar.
3. **`$group`**: Gruplama işlemi yapar ve:
   - **`averageDurationTime`**: Ortalama süreyi (`runtime`) hesaplar.
   - **`movies`**: Tüm filmleri bir dizi halinde saklar.
4. **`$project`**: Sonuç olarak aşağıdaki alanları döndürür:
   - **`averageDurationTime`**: Ortalama süre.
   - **`movies`**: Filmlerin başlıkları, türleri, yapım yılları, süreleri ve varsa yorumları.

## Sorgu

```json
[
    {
        "$match": {
            "year": { "$gte": 2014 },
            "genres": "Western"
        }
    },
    {
        "$lookup": {
            "from": "comments",
            "localField": "_id",
            "foreignField": "movie_id",
            "as": "movie_comments"
        }
    },
    {
        "$group": {
            "_id": null,
            "averageDurationTime": { "$avg": "$runtime" },
            "movies": { "$push": "$$ROOT" }
        }
    },
    {
        "$project": {   
            "_id": 0,
            "averageDurationTime": 1,
            "movies": { 
                "title": 1,
                "genres": 1,
                "year": 1,
                "runtime": 1,
                "movie_comments.text": 1
            }
        }
    }
]
```

### Örnek Çıktı

```json
{
    "averageDurationTime": 112.5,
    "movies": [
        {
            "title": "Western Movie A",
            "genres": ["Western", "Drama"],
            "year": 2015,
            "runtime": 120,
            "movie_comments": [
                { "text": "Great movie!" },
                { "text": "Loved the acting." }
            ]
        },
        {
            "title": "Western Movie B",
            "genres": ["Western"],
            "year": 2018,
            "runtime": 105,
            "movie_comments": [
                { "text": "Classic Western vibes." }
            ]
        }
    ]
}
```

Bu sorgu, Western kategorisindeki filmlerin ortalama sürelerini ve detaylı bilgilerini döndürür.
