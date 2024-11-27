
# Sample 6: IMDB Puanını Yuvarlama

Bu sorgu, IMDB puanlarını tam sayıya yuvarlar.

## Açıklama

1. **`$addFields`**: 
   - Yeni bir alan (`roundedRating`) ekler ve `imdb.rating` alanını `$round` operatörü ile tam sayıya yuvarlar.
   - `$round`:
     - `0`: Tam sayıya yuvarlar.
     - `1`: Ondalık kısmı 1 basamak bırakır.
     - `2`: Ondalık kısmı 2 basamak bırakır.

2. **`$project`**: 
   - Sadece `roundedRating` ve `title` alanlarını döndürür.

## Sorgu

```json
[
    {
        "$addFields": {
            "roundedRating": {
                "$round": ["$imdb.rating", 0]
            }
        }
    },
    {
        "$project": {
            "_id": 0,
            "baslik": "$title",
            "roundedRating": 1
        }
    }
]
```

### Örnek Çıktı

```json
[
    {
        "baslik": "Movie A",
        "roundedRating": 8
    },
    {
        "baslik": "Movie B",
        "roundedRating": 7
    }
]
```

Bu sorgu ile, filmlerin IMDB puanları tam sayıya yuvarlanmış olarak gösterilir.
