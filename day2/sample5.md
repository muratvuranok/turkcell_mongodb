
# Sample 5: Comedy Türündeki Filmlerin Ortalama IMDB Puanı

Bu sorgu, Comedy türündeki filmlerin ortalama IMDB puanını hesaplar.

## Açıklama

1. **`$match`**: 
   - **`genres`**: "Comedy" türündeki filmleri seçer.

2. **`$group`**: 
   - **`_id`**: Sabit `null` değeri kullanarak tüm belgeleri bir grupta toplar.
   - **`avgRating`**: Ortalama IMDB puanını hesaplar.

3. **`$project`**: 
   - Sadece `avgRating` alanını döndürür.

## Sorgu

```json
[
    {
        "$match": {
            "genres": "Comedy"
        }
    },
    {
        "$group": {
            "_id": null,
            "avgRating": {
                "$avg": "$imdb.rating"
            }
        }
    },
    {
        "$project": {
            "_id": 0, 
            "avgRating": 1
        }
    }
]
```

### Örnek Çıktı

```json
{
    "avgRating": 7.4
}
```

Bu sorgu, Comedy türündeki filmlerin ortalama IMDB puanını verir.
