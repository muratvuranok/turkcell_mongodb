
# Sample 8: Filmleri Süre Kategorisine Göre Sınıflandırma

Bu sorgu, filmleri sürelerine göre "Long" (120 dakika ve üzeri) ve "Short" (120 dakikadan kısa) olarak kategorize eder.

## Açıklama

1. **`$addFields`**: 
   - Yeni bir alan (`durationCategory`) ekler:
     - Eğer süre (`runtime`) 120 dakikadan büyük veya eşitse, "Long".
     - Aksi durumda "Short".

2. **`$sort`**: 
   - Süre kategorisine (`durationCategory`) göre sıralama yapar.

3. **`$project`**: 
   - Çıktıya sadece ilgili alanları dahil eder:
     - Filmin adı (`title`), toplam süre (`runtime`), kategori (`durationCategory`), poster ve yapım yılı.

## Sorgu

```json
[
    {
        "$addFields": {
            "durationCategory": {
                "$cond": {
                    "if": { "$gte": ["$runtime", 120] },
                    "then": "Long",
                    "else": "Short"
                }
            }
        }
    },
    {
        "$sort": {
            "durationCategory": 1
        }
    },
    {
        "$project": {
            "_id": 0,
            "title": 1,
            "runtime": 1,
            "durationCategory": 1,
            "poster": 1,
            "year": 1
        }
    }
]
```

### Örnek Çıktı

```json
[
    {
        "title": "Movie A",
        "runtime": 95,
        "durationCategory": "Short",
        "poster": "poster_a.jpg",
        "year": 2010
    },
    {
        "title": "Movie B",
        "runtime": 130,
        "durationCategory": "Long",
        "poster": "poster_b.jpg",
        "year": 2020
    }
]
```

Bu sorgu, filmleri süre kategorisine göre gruplar ve ilgili bilgileri döndürür.
