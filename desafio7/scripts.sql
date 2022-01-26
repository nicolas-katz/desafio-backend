CREATE DATABASE desafio_sql

USE desafio_sql

CREATE TABLE productos(
id int not null,
_name varchar not null,
price int not null,
thumbnail varchar not null
)

INSERT INTO productos VALUES
	(1, "Remera", "La mejor remera de todas", 100),
    (2, "Pantalon", "El mejor pantalon de todos", 200),
	(3, "Campera", "La mejor campera de todas", 300)

