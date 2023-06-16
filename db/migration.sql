DROP TABLE IF EXISTS trails;

CREATE TABLE trails (
   trail_id SERIAL PRIMARY KEY NOT NULL,
   trail_name varchar(40) NOT NULL,
   location varchar(40) NOT NULL,
   difficulty varchar(20) NOT NULL,
   distance numeric,
   duration interval,
   description text,
   rating numeric
   --image_path text
);


INSERT INTO trails (trail_name, location, difficulty, distance, duration, description, rating) VALUES ('Taft Point and The Fissures', 'Yosemite', 'Easy', 2.3, '1 hour', ' The view at Taft Point is an awe-inspiring sight of the granite cliffs dropping into the valley below. The adjacent Fissures trail then takes you through narrow and deep cracks in the granite.', 4.7);
INSERT INTO trails (trail_name, location, difficulty, distance, duration, description, rating) VALUES ('Brink of the Lower Falls Trail', 'Yellowstone', 'Moderate', 0.7, '30 minutes', 'As you hike along the trail, you will be surrounded by the lush greenery of the canyon, with glimpses of the vibrant blue waters of the Yellowstone River below. When you reach the brink of the Lower Falls, you will see a panoramic view of the majestic 308-foot waterfall plunging into the canyon below.', 4.7);
INSERT INTO trails (trail_name, location, difficulty, distance, duration, description, rating) VALUES ('South Kaibab Trail to Cedar Ridge', 'Grand Canyon', 'Moderate', 3.1, '2 hours', 'This trail offers steep switchbacks, surrounded by vibrant canyon walls that change with the shifting sunlight. Arrive at Cedar Ridge, a picturesque plateau boasting panoramic vistas of the sprawling canyon.', 4.9);
--INSERT INTO trails (trail_name, location, difficulty, distance, duration, description, rating) VALUES ('Example Trail', 'Zion', 'Easy', 5.3, '2 hours', 'This is an example trail.', 4.5);
--INSERT INTO trails (trail_name, location, difficulty, distance, duration, description, rating) VALUES ('Example Trail', 'Glacier', 'Easy', 5.3, '2 hours', 'This is an example trail.', 4.5);
