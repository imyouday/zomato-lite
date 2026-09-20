DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  cuisine   TEXT NOT NULL,
  area      TEXT NOT NULL,
  image     TEXT NOT NULL
);

CREATE TABLE reviews (
  id            SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO restaurants (id, name, cuisine, area, image) VALUES
  (1, 'Naturals Icecream', 'Ice Cream', 'Sector 21', '/naturals.jpg'),
  (2, 'Ludhiana Burrito', 'Indian', 'Sector 32', '/burrito.jpg'),
  (3, 'Angrezi Dhaba', 'North Indian', 'Sector 8', '/paneer.jpg');

INSERT INTO reviews (id, restaurant_id, rating, comment, created_at) VALUES
  (101, 1, 5, 'Mango ice cream is deadly good',     NOW() - INTERVAL '3 days'),
  (102, 1, 4, 'Creamy and fresh. Bit pricey.',       NOW() - INTERVAL '1 day'),
  (103, 2, 5, 'Paneer burrito is unreal',            NOW() - INTERVAL '8 days'),
  (104, 2, 4, 'Good, but slow service',              NOW() - INTERVAL '6 days'),
  (105, 2, 4, 'Solid. Would repeat.',                NOW() - INTERVAL '2 days'),
  (106, 3, 5, 'Dal makhani and tandoori roti go hard', NOW() - INTERVAL '5 days'),
  (107, 3, 3, 'Flavourful but paneer was chewy.',    NOW() - INTERVAL '12 hours');

SELECT setval(pg_get_serial_sequence('restaurants', 'id'), (SELECT MAX(id) FROM restaurants));
SELECT setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews));