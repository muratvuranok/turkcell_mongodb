
# Sample 9: Filmleri Süre Kategorisine Göre Sınıflandırma (İki Yöntem)

Bu sorgu, filmleri sürelerine göre "Long" (120 dakika ve üzeri) ve "Short" (120 dakikadan kısa) olarak kategorize eder.

---

## 1. Yöntem: `$addFields` ile Süre Kategorisi Ekleme

### Açıklama

1. **`$addFields`**: 
   - Yeni bir alan (`durationCategory`) ekler:
     - Eğer süre (`runtime`) 120 dakikadan büyük veya eşitse, "Long".
     - Aksi durumda "Short".

2. **`$sort`**: 
   - Süre kategorisine (`durationCategory`) göre sıralama yapar.

3. **`$project`**: 
   - Çıktıya sadece ilgili alanları dahil eder:
     - Filmin adı (`title`), toplam süre (`runtime`), kategori (`durationCategory`), poster ve yapım yılı.

### Sorgu

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
        "runtime": 90,
        "durationCategory": "Short",
        "poster": "poster_a.jpg",
        "year": 2015
    },
    {
        "title": "Movie B",
        "runtime": 150,
        "durationCategory": "Long",
        "poster": "poster_b.jpg",
        "year": 2020
    }
]
```

---

## 2. Yöntem: `$project` ile Süre Kategorisi Doğrudan Belirleme

### Açıklama

1. **`$project`**: 
   - **`durationCategory`**: `$cond` kullanılarak doğrudan süre kategorisi hesaplanır.
     - Eğer süre (`runtime`) 120 dakikadan büyük veya eşitse, "Long".
     - Aksi durumda "Short".

2. **`$sort`**: 
   - Süre kategorisine (`durationCategory`) göre sıralama yapar.

### Sorgu

```json
[
    {
        "$project": {
            "_id": 0,
            "title": 1,
            "runtime": 1,
            "poster": 1,
            "year": 1,
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
        "$sort": { "durationCategory": 1 }
    }
]
```

### Örnek Çıktı

```json
[
    {
        "title": "Movie C",
        "runtime": 100,
        "durationCategory": "Short",
        "poster": "poster_c.jpg",
        "year": 2010
    },
    {
        "title": "Movie D",
        "runtime": 130,
        "durationCategory": "Long",
        "poster": "poster_d.jpg",
        "year": 2018
    }
]
```

---

Bu iki yöntem, filmleri süre kategorisine göre sınıflandırmak için farklı yaklaşımlar sunar. İlki `$addFields`, ikincisi `$project` aşamasında kategori ekler.
