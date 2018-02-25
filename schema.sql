DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID MEDIUMINT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);

SELECT * FROM Products;

INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES  ('Shampoo', 'Cosmetics', 5.15, 250),
        ('Conditioner', 'Cosmetics', 3.25, 290),
        ('Onion', 'Grocery', 1.99, 322),
        ('Yogurt', 'Grocery', 1.25, 344),
        ('Apples', 'Produce', 0.85, 899),
        ('Banana', 'Produce', 0.29, 870),
        ('Orange', 'Grocery', 0.45, 900),
        ('Cabbage', 'Grocery', 0.50, 300),
        ('Diapers', 'Children', 4.75, 490),
        ('Jalapeno', 'Grocery', 4.99, 903),
        ('Baby Wipes', 'Children', 1.50, 390),
        ('Ball', 'Sports', 12.75, 200),
        ('Weight', 'Sports', 7.22, 890),
        ('Shirt', 'Clothing', 7.12, 128),
        ('Shorts', 'Clothing', 2.19, 288),
        ('Ibuprophen', 'Pharmacy', 4.95, 700),
        ('Tylenol', 'Pharmacy', 3.15, 799),
        ('Water', 'Grocery', 3.99, 677);

CREATE TABLE Departments(
    DepartmentID MEDIUMINT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));

INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES  ('Cosmetics', 50000.00, 15000.00),
        ('Grocery', 20000.00, 12000.00),
        ('Produce', 30000.00, 15000.00),
        ('Children', 3000.00, 12000.00),
        ('Sports', 1200.00, 15000.00),
        ('Clothing', 35000.00, 15000.00),
        ('Pharmacy', 12000.00, 12000.00);


