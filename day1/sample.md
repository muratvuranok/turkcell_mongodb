
# Örnek JSON Yapıları ve Açıklamaları

## 1. **MongoDB Simülasyonu**
### **Açıklama**: 
Bu yapı, `people` adlı bir MongoDB koleksiyonunu temsil eder. Her belge bir kişiyi temsil eder ve isim, yaş, iletişim bilgileri ve hobiler gibi detayları içerir.
```json
{
    "people": [
        {
            "name": "murat",
            "surname": "vuranok",
            "age": 40,
            "phone": "+905323520997",
            "email": "muratvuranok@hotmail.com",
            "active": true,
            "address": {
                "city": "istanbul",
                "district": "kadiköy",
                "street": "bahariye"
            },
            "hobbies": [
                "swimming",
                "reading",
                "traveling"
            ]
        }
    ]
}
```

---

## 2. **API Yanıtı**
### **Açıklama**: 
Başarılı bir kullanıcı sorgusunda dönen API yanıtı. Başarısızlık durumunda hata mesajı döner.
```json
{
    "status": 200,
    "data": {
        "userId": 1,
        "name": "murat",
        "surname": "vuranok",
        "age": 40,
        "phone": "+905323520997",
        "email": "murat@vuranok.com"
    },
    "message": "Success"
}
```

---

## 3. **Yapılandırma Dosyası**
### **Açıklama**: 
Veritabanı, loglama ve JWT ayarlarını içeren bir yapılandırma dosyası. Veritabanı şifresi güvenlik için şifrelenmelidir.
```json
{
    "database": {
        "host": "localhost",
        "port": 5432,
        "user": "admin",
        "password": "password123"
    },
    "logging": {
        "level": "info",
        "path": "/var/log/app.log"
    },
    "jwt": {
        "secretKey": "turkcell"
    }
}
```

---

## 4. **Hata Yanıtı**
### **Açıklama**: 
404 Not Found hatasını temsil eden standart bir hata nesnesi.
```json
{
    "error": {
        "code": 404,
        "message": "Not Found"
    }
}
```

---

## 5. **İçerik Örneği**
### **Açıklama**: 
Başlık, yazar ve etiketler gibi meta verilerle içerik yapısını temsil eder.
```json
{
    "title": "MongoDB",
    "content": "Türkcell MongoDb Eğitimi",
    "author": "murat vuranok",
    "image": "https://www.turkcell.com.tr/.../mongodb.jpg",
    "createdAt": "2021-09-01T10:00:00Z",
    "rate": 5,
    "tags": [
        "mongodb",
        "database",
        "nosql"
    ]
}
```

---

## 6. **Grafik Verileri**
### **Açıklama**: 
Grafik türü, etiketler ve veri seti özelliklerini içeren görselleştirme yapılandırması.
```json
{
    "labels": [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ],
    "chartType": "pie",
    "datasets": [
        {
            "label": "My First Dataset",
            "data": [
                65,
                59,
                80,
                81,
                56,
                55,
                40
            ],
            "fill": false,
            "borderColor": "rgb(75, 192, 192)",
            "lineTension": 0.1
        }
    ]
}
```

---

## 7. **Token ve Kimlik Doğrulama**
### **Açıklama**: 
Token tabanlı kimlik doğrulama için örnek bir JSON yapısı. JWT ve yenileme token'larını içerir.
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "expiresIn": 3600
}
```

---

Her bir JSON yapısı, veritabanı şeması simülasyonu, API yanıtları, yapılandırma dosyaları ve görselleştirme verileri gibi farklı kullanım senaryolarını temsil eder. Uygulamalarınızda bu yapıları referans olarak kullanabilirsiniz.
