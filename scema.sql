DROP DATABASE IF EXISTS salesdb;
CREATE database salesdb;

USE salesdb;

CREATE TABLE stock (
	id INT(200) AUTO_INCREMENT NOT NULL,
	player VARCHAR (200) NULL,
	sport VARCHAR (200) NULL,
	department VARCHAR (200) NULL,
	price DECIMAL (6,2) NULL,
	stock INTEGER (200) NULL,
	PRIMARY KEY (id)
);

SELECT * FROM stock; 

INSERT INTO stock (player, sport, department, price, stock)

VALUES ("Yadier Molina", "baseball", "Jersey", 119.99, 10), ("Marshawn Lynch", "football", "Jersey", 99.99, 8), ("Jonathan Toews", "hockey", "Jersey", 84.99, 5), ("Carmelo Anthony", "basketball", "Jersey", 55.99, 6), ("Tom Brady", "football", "Jersey", 99.99, 1), ("Stephen Curry", "basketball", "Jersey", 69.99, 1), ("Pavel Datsyuk", "hockey", "Jersey", 164.99, 9),("Derek Jeter", "baseball", "Jersey", 134.99, 6), ("Derrick Rose", "basketball", "Jersey", 34.99, 7), ("Cristiano Ronaldo", "soccer", "Jersey", 134.99, 3)


-- 11, Colin Kaepernick, football, Jersey, 59.99,
-- 12, Kobe Bryant, basketball, Jersey, 120.00,
-- 13, Dustin Pedroia, baseball, Jersey, 119.99,
-- 14, Peyton Manning, football, Jersey, 149.99,
-- 15, Clint Dempsey, soccer, Jersey, 79.99,
-- 16, Kevin Durant, basketball, Jersey, 69.99,
-- 17, Sidney Crosby, hockey, Jersey, 169.99,
-- 18, David Ortiz, baseball, Jersey, 119.99,
-- 19, Russell Wilson, football, Jersey, 99.99,
-- 20, LeBron James, basketball, Jersey, 69.99)