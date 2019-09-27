CREATE DATABASE IF NOT EXISTS shop;

USE shop;

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    expiryDate datetime NOT NULL,
    highestBid INT NOT NULL,
    highestBidderName VARCHAR(30) NOT NULL
);

INSERT INTO items 
  (title,expiryDate,highestBid,highestBidderName)
   VALUES ("Book 1","2020-12-12 14:14:14", "2", "Saci");

