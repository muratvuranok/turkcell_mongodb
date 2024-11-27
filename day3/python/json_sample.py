from pymongo import MongoClient

import json

# MongoDB Bağlantısı
client = MongoClient('mongodb://localhost:27017')


# Hedef veritabanı ve koleksiyon
db = client['pythonDatabase']
collection = db['customers']


# Json formartında yer alan dataların eklenmesi

file_url = r'C:\Users\murat\OneDrive\Desktop\TurkcellEdu\turkcell_mongodb\day3\customer.json'

 
try:
    with open(file_url, 'r', encoding='utf-8') as file:
        data = json.load(file) 

        def map_file(record):
            """
            Alan isimlerinin düzenlenmesi
            """
            return{
                "_id"    : record['CustomerID'], 
                "firstName": record['FirstName'],
                "lastName":record['LastName'],
                "email":record['Email'],
                "phoneNumber":record['PhoneNumber'],
                "address":record['Address'],
                "company":record['Company'],
                "title":record['Title'] 
            }



    
        # eğer gelen data liste formatında ise, many, değil ise one olarak sorgu çalışacaktır.
        if isinstance(data, list):
            transformed_data = [map_file(record) for record in data]
            collection.insert_many(transformed_data)
        else:
            transformed_data = map_file(data)
            collection.insert_one(transformed_data)

    print('Verile MongoDB ye eklendi.')
except Exception as e:
    print(e)