
# MongoDB Relational Scenarios

## 1. **One-to-Many Relationship**
### **Açıklama**:
Bir kategorinin birden fazla ürünü olabilir. Bu ilişki, MongoDB'de bir koleksiyonda yer alabilir veya `categories` ve `products` koleksiyonları arasında bir `categoryId` ile sağlanabilir.

### **JSON Örnekleri**:
#### **Embedded (Tek Koleksiyon)**:
```json
{
    "categories": [
        {
            "id": 1,
            "categoryName": "Electronics",
            "description": "Electronic devices and gadgets",
            "products": [
                {
                    "id": 1,
                    "productName": "Smartphone",
                    "price": 699,
                    "unitsInStock": 50
                },
                {
                    "id": 2,
                    "productName": "Laptop",
                    "price": 999,
                    "unitsInStock": 30
                }
            ]
        },
        {
            "id": 2,
            "categoryName": "Furniture",
            "description": "Home and office furniture",
            "products": [
                {
                    "id": 3,
                    "productName": "Office Chair",
                    "price": 150,
                    "unitsInStock": 200
                }
            ]
        }
    ]
}
```

#### **Referenced (Ayrı Koleksiyonlar)**:
**Categories Koleksiyonu**:
```json
[
    {
        "_id": 1,
        "categoryName": "Electronics",
        "description": "Electronic devices and gadgets"
    },
    {
        "_id": 2,
        "categoryName": "Furniture",
        "description": "Home and office furniture"
    }
]
```

**Products Koleksiyonu**:
```json
[
    {
        "_id": 1,
        "productName": "Smartphone",
        "price": 699,
        "unitsInStock": 50,
        "categoryId": 1
    },
    {
        "_id": 2,
        "productName": "Laptop",
        "price": 999,
        "unitsInStock": 30,
        "categoryId": 1
    },
    {
        "_id": 3,
        "productName": "Office Chair",
        "price": 150,
        "unitsInStock": 200,
        "categoryId": 2
    }
]
```

---

## 2. **One-to-One Relationship**
### **Açıklama**:
Bir kullanıcının sadece bir detay kaydı olabilir. Bu ilişki, `users` ve `userDetails` koleksiyonları arasında bir `userId` ile sağlanabilir.

### **JSON Örnekleri**:
#### **Embedded (Tek Koleksiyon)**:
```json
{
    "users": [
        {
            "_id": 1,
            "name": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",
            "details": {
                "address": "123 Main St, New York, NY",
                "phone": "+123456789"
            }
        },
        {
            "_id": 2,
            "name": "Jane",
            "surname": "Smith",
            "email": "jane.smith@example.com",
            "details": {
                "address": "456 Elm St, Los Angeles, CA",
                "phone": "+987654321"
            }
        }
    ]
}
```

#### **Referenced (Ayrı Koleksiyonlar)**:
**Users Koleksiyonu**:
```json
[
    {
        "_id": 1,
        "name": "John",
        "surname": "Doe",
        "email": "john.doe@example.com"
    },
    {
        "_id": 2,
        "name": "Jane",
        "surname": "Smith",
        "email": "jane.smith@example.com"
    }
]
```

**UserDetails Koleksiyonu**:
```json
[
    {
        "_id": 1,
        "address": "123 Main St, New York, NY",
        "phone": "+123456789"
    },
    {
        "_id": 2,
        "address": "456 Elm St, Los Angeles, CA",
        "phone": "+987654321"
    }
]
```

---

## 3. **Many-to-Many Relationship**
### **Açıklama**:
Bir öğrencinin birden fazla dersi olabilir ve bir ders birden fazla öğrenciye ait olabilir. Bu ilişki, `students`, `lessons` ve ara koleksiyon olan `studentLessons` ile sağlanabilir.

### **JSON Örnekleri**:
#### **Embedded (Dersler Öğrencilerle)**:
```json
{
    "students": [
        {
            "_id": 1,
            "name": "Alice",
            "surname": "Johnson",
            "lessons": [
                {
                    "id": 101,
                    "lessonName": "Mathematics",
                    "credit": 5
                },
                {
                    "id": 102,
                    "lessonName": "Physics",
                    "credit": 4
                }
            ]
        }
    ]
}
```

#### **Referenced (Ayrı Koleksiyonlar)**:
**Students Koleksiyonu**:
```json
[
    {
        "_id": 1,
        "name": "Alice",
        "surname": "Johnson"
    },
    {
        "_id": 2,
        "name": "Bob",
        "surname": "Williams"
    }
]
```

**Lessons Koleksiyonu**:
```json
[
    {
        "_id": 101,
        "lessonName": "Mathematics",
        "credit": 5
    },
    {
        "_id": 102,
        "lessonName": "Physics",
        "credit": 4
    }
]
```

**StudentLessons Ara Koleksiyonu**:
```json
[
    {
        "studentId": 1,
        "lessonId": 101
    },
    {
        "studentId": 1,
        "lessonId": 102
    },
    {
        "studentId": 2,
        "lessonId": 101
    }
]
```

---

Bu örnekler, MongoDB'de farklı ilişki türlerini (One-to-Many, One-to-One, Many-to-Many) hem tek koleksiyonlu hem de referanslı olarak açıklamaktadır.
