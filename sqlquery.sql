create database Company
use Company

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(15) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    Company NVARCHAR(100),
    Title NVARCHAR(50)
);

 
DECLARE @i INT = 0;
WHILE @i < 1000000
BEGIN
    INSERT INTO Customer (FirstName, LastName, Email, PhoneNumber, Address, Company, Title)
    VALUES (
        CONCAT('FirstName', ABS(CHECKSUM(NEWID()) % 1000000)),
        CONCAT('LastName', ABS(CHECKSUM(NEWID()) % 1000000)),
        CONCAT('user', ABS(CHECKSUM(NEWID()) % 1000000), '@example.com'),
        CONCAT('555-', RIGHT('0000' + CAST(ABS(CHECKSUM(NEWID()) % 10000) AS NVARCHAR(4)), 4)),
        CONCAT(ABS(CHECKSUM(NEWID()) % 10000), ' Main St, City', ABS(CHECKSUM(NEWID()) % 1000), ', Country'),
        CONCAT('Company', ABS(CHECKSUM(NEWID()) % 10)),
        CASE ABS(CHECKSUM(NEWID()) % 5)
            WHEN 0 THEN 'Developer'
            WHEN 1 THEN 'Manager'
            WHEN 2 THEN 'Analyst'
            WHEN 3 THEN 'Teacher'
            ELSE 'Engineer'
        END
    );
    SET @i = @i + 1;
END;
