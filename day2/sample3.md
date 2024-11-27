
# Sample 3: Türüne Göre Filmlerin Ortalama Süresini Hesaplama

Bu sorgu, filmleri türlerine göre ayırır ve her tür için ortalama süreyi hesaplar.

## Açıklama

1. **`$unwind`**: 
   - **`path`**: `genres` dizisini açar, yani her tür için ayrı bir belge oluşturur.
   - Bir film birden fazla türe sahipse, her tür bir satır olarak değerlendirilir.

2. **`$group`**: 
   - **`_id`**: Tür (`genres`) bazında gruplama yapar.
   - **`avgTime`**: Her grup için ortalama süreyi (`runtime`) hesaplar.

3. **`$sort`**: 
   - Ortalama süreye (`avgTime`) göre azalan sırada sıralama yapar.

## Sorgu

```json
[
    {
        "$unwind": { "path": "$genres" }
    },
    {
        "$group": {
            "_id": "$genres",
            "avgTime": { "$avg": "$runtime" }
        }
    },
    {
        "$sort": { "avgTime": -1 }
    }
]
```

### Örnek Çıktı

```json
[
    {
        "_id": "Adventure",
        "avgTime": 134.5
    },
    {
        "_id": "Drama",
        "avgTime": 120.8
    },
    {
        "_id": "Comedy",
        "avgTime": 95.6
    },
    {
        "_id": "Horror",
        "avgTime": 87.3
    }
]
```

Bu sorgu ile her türdeki filmlerin ortalama sürelerini öğrenebilirsiniz.
