from pymongo import MongoClient

import json

# MongoDB Bağlantısı
client = MongoClient('mongodb://localhost:27017')


# Hedef veritabanı ve koleksiyon
db = client['pythonDb']
collection = db['customers']


# Json formartında yer alan dataların eklenmesi

file_url = r'C:\Users\murat\OneDrive\Desktop\TurkcellEdu\turkcell_mongodb\day3\customer.json'

with open(file_url, 'r', encoding='utf-8') as file:
    data = json.load(file)

    # eğer gelen data liste formatında ise, many, değil ise one olarak sorgu çalışacaktır.
    if isinstance(data, list):
        collection.insert_many(data)
    else:
        collection.insert_one(data)

print('Verile MongoDB ye eklendi.')