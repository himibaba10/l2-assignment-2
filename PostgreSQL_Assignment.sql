CREATE TABLE rangers (
    ranger_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL
);

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(50) NOT NULL,
    scientific_name VARCHAR(50) NOT NULL UNIQUE,
    discovery_date DATE NOT NULL,
    conservation_status VARCHAR(50) NOT NULL
);

CREATE TABLE sightings (
    sighting_id SERIAL PRIMARY KEY,
    ranger_id INT REFERENCES rangers (ranger_id) NOT NULL,
    species_id INT REFERENCES species (species_id) NOT NULL,
    sighting_time TIMESTAMP NOT NULL,
    location VARCHAR(100),
    notes VARCHAR(150)
);

INSERT INTO
    rangers (name, region)
VALUES (
        'Alice Green',
        'Northern Hills'
    ),
    ('Bob White', 'River Delta'),
    (
        'Carol King',
        'Mountain Range'
    );

INSERT INTO
    species (
        common_name,
        scientific_name,
        discovery_date,
        conservation_status
    )
VALUES (
        'Snow Leopard',
        'Panthera uncia',
        '1775-01-01',
        'Endangered'
    ),
    (
        'Bengal Tiger',
        'Panthera tigris',
        '1758-01-01',
        'Endangered'
    ),
    (
        'Red Panda',
        'Ailurus fulgens',
        '1825-01-01',
        'Vulnerable'
    ),
    (
        'Asiatic Elephant',
        'Elephas maximus indicus',
        '1758-01-01',
        'Endangered'
    );

INSERT INTO
    sightings (
        species_id,
        ranger_id,
        location,
        sighting_time,
        notes
    )
VALUES (
        1,
        1,
        'Peak Ridge',
        '2024-05-10 07:45:00',
        'Camera trap image captured'
    ),
    (
        2,
        2,
        'Bankwood Area',
        '2024-05-12 16:20:00',
        'Juvenile seen'
    ),
    (
        3,
        3,
        'Bamboo Grove East',
        '2024-05-15 09:10:00',
        'Feeding observed'
    ),
    (
        1,
        2,
        'Snowfall Pass',
        '2024-05-18 18:30:00',
        NULL
    );

SELECT * FROM rangers;

SELECT * FROM species;

SELECT * FROM sightings;

-- Problem 1
INSERT INTO
    rangers (name, region)
VALUES ('Derek Fox', 'Coastal Plains');

-- Problem 2
SELECT COUNT(DISTINCT (scientific_name))
FROM species
    JOIN sightings using (species_id);

-- Problem 3
SELECT * FROM sightings WHERE location ILIKE '%pass%';

-- Problem 4
SELECT name, COUNT(*) as total_sightings
FROM sightings
    JOIN rangers USING (ranger_id)
GROUP BY
    name;

-- Problem 5
SELECT common_name
FROM species
    LEFT JOIN sightings USING (species_id)
WHERE
    sighting_id IS NULL;

-- Problem 6
SELECT common_name, sighting_time, name
FROM sightings
    JOIN species USING (species_id)
    JOIN rangers USING (ranger_id)
ORDER BY sighting_time DESC
LIMIT 2;

-- Problem 7
UPDATE species
SET
    conservation_status = 'Historic'
WHERE
    EXTRACT(
        YEAR
        FROM discovery_date
    ) < 1800;

-- Problem 8
CREATE OR REPLACE FUNCTION get_label( hour INT )
RETURNS VARCHAR(50)
LANGUAGE SQL
AS
$$
    SELECT CASE
        WHEN hour < 12 THEN 'Morning'
        WHEN hour < 17 THEN 'Afternoon'
        ELSE 'Evening'
    END;
$$;

SELECT sighting_id, get_label (
        EXTRACT(
            HOUR
            FROM sighting_time
        )
    )
FROM sightings;

-- Problem 9
CREATE VIEW ranger_with_no_species AS
SELECT name
FROM sightings
    JOIN species USING (species_id)
    RIGHT JOIN rangers USING (ranger_id)
WHERE
    species_id IS NULL;

DELETE FROM rangers
WHERE
    name = (
        SELECT *
        FROM ranger_with_no_species
    );