
# Sample 1: Son 10 Yıl İçerisinde (2014 Sonrası) Yapılmış Filmler ve Yorumları

Bu sorgu, 2014 yılından sonra yapılmış filmleri getirir ve bu filmlere ait yorumları listeler.

## Açıklama

1. **`$match`**: Yalnızca 2014 ve sonrasında yapılmış filmleri filtreler.
2. **`$lookup`**: Filmler (`movies` koleksiyonu) ile yorumlar (`comments` koleksiyonu) arasında birleştirme işlemi yapar.
   - **`from`**: Birleştirilecek koleksiyonun adı (`comments`).
   - **`localField`**: Film koleksiyonundaki `_id` alanı.
   - **`foreignField`**: Yorum koleksiyonundaki `movie_id` alanı.
   - **`as`**: Sonuçlarda birleştirilen verilerin saklanacağı alan adı (`movie_comments`).
3. **`$project`**: İlgili verileri seçer ve yalnızca aşağıdaki alanları döndürür:
   - **`title`**: Filmin adı.
   - **`year`**: Yapım yılı.
   - **`movie_comments.text`**: Yorumların metin kısmı.
   - **`movie_comments.email`**: Yorumu yapan kişinin e-posta adresi.

## Sorgu

```json
[
    {
        "$match": {
            "year": {
                "$gte": 2014
            }
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
        "$project": {
            "title": 1,
            "year": 1,
            "_id": 0,
            "movie_comments.text": 1,
            "movie_comments.email": 1
        }
    }
]
```

### Örnek Çıktı

Eğer koleksiyonda 2014 sonrası yapılmış filmler varsa, sonuç aşağıdaki gibi görünebilir:

```json
[
    {
        "title": "Movie A",
        "year": 2015,
        "movie_comments": [
            {
                "text": "Great movie!",
                "email": "user1@example.com"
            },
            {
                "text": "Amazing visuals.",
                "email": "user2@example.com"
            }
        ]
    },
    {
        "title": "Movie B",
        "year": 2017,
        "movie_comments": [
            {
                "text": "Not bad.",
                "email": "user3@example.com"
            }
        ]
    }
]
```

Bu sorgu ile, son 10 yıl içinde yapılmış filmlerin başlıkları ve bu filmlerle ilgili yorumlar listelenir.
