
# Sample 4: Action Türündeki Filmlerin En Uzun Süresi

Bu sorgu, Action türündeki filmler arasında en uzun süreye sahip olan filmi bulur.

## Açıklama

1. **`$match`**: 
   - **`genres`**: "Action" türündeki filmleri seçer.

2. **`$group`**: 
   - **`_id`**: Sabit `null` değeri kullanarak tüm belgeleri bir grupta toplar.
   - **`maxTime`**: En uzun süreyi (`runtime`) bulur.

## Sorgu

```json
[
    {
        "$match": {
            "genres": "Action"
        }
    },
    {
        "$group": {
            "_id": null,
            "maxTime": {
                "$max": "$runtime"
            }
        }
    }
]
```

### Örnek Çıktı

```json
{
    "maxTime": 150
}
```

Bu sorgu, Action türündeki en uzun filme ait sürenin kaç dakika olduğunu gösterir.
