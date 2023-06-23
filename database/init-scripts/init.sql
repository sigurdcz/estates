-- Vytvoření tabulky estates
CREATE TABLE IF NOT EXISTS estates (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_link VARCHAR(255) NOT NULL
);