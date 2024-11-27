
# Sample 7: Filmlerin Süresini Saat ve Dakika Olarak Gösterme

Bu sorgu, filmlerin süresini saat ve dakika cinsinden hesaplar.

## Açıklama

1. **`$addFields`**: 
   - Yeni alanlar ekler:
     - **`hours`**: Süreyi (`runtime`) 60'a böler ve tam kısmını alır (`$floor`).
     - **`minutes`**: Sürenin 60 ile bölümünden kalanı alır (`$mod`).

2. **`$project`**: 
   - Çıktıya sadece ilgili alanları dahil eder:
     - Filmin adı (`title`), toplam süre (`runtime`), saat (`hours`) ve dakika (`minutes`).

## Sorgu

```json
[
    {
        "$addFields": {
            "hours": {
                "$floor": {
                    "$divide": ["$runtime", 60]
                }
            },
            "minutes": {
                "$mod": ["$runtime", 60]
            }
        }
    },
    {
        "$project": { 
            "_id": 0,
            "title": 1,
            "runtime": 1,
            "hours": 1,
            "minutes": 1
        }
    }
]
```

### Örnek Çıktı

```json
[
    {
        "title": "Movie A",
        "runtime": 130,
        "hours": 2,
        "minutes": 10
    },
    {
        "title": "Movie B",
        "runtime": 95,
        "hours": 1,
        "minutes": 35
    }
]
```

Bu sorgu, filmlerin süresini saat ve dakika olarak gösterir.
