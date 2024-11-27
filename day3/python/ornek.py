from pymongo import MongoClient
import pandas as pd

# MongoDB Bağlantısı
client = MongoClient('mongodb://localhost:27017')

# Hedef veritabanı ve koleksiyon
db = client['pythonCSV']
collection = db['customers']

# CSV formatında yer alan dataların eklenmesi
file_url = r'C:\Users\murat\OneDrive\Desktop\TurkcellEdu\turkcell_mongodb\day3\customers.csv'

try:
    # pandas ile csv dosyasının okunması
    df = pd.read_csv(file_url)

    # Alan isimlerini değiştirme
    # _id	firstName	lastName	email	phoneNumber	address	company	title

    df.rename(columns={
        'CustomerID': '_id',
        'FirstName': 'firstName',
        'LastName': 'lastName',
        'Email': 'email',
        'PhoneNumber': 'phoneNumber',
        'Address': 'address',
        'Company': 'company',
        'Title': 'title'
    }, inplace=True)

    # DataFrame'i sözlükler listesine dönüştürme
    data = df.to_dict(orient='records')

    # Verileri MongoDB'ye ekleme
    collection.insert_many(data)
    print('Data eklendi')

except Exception as e:
    # Hata mesajını yazdırma
    print(e)
