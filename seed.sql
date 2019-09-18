DROP TABLE musicians;
DROP TABLE instruments;


CREATE TABLE instruments (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  brand      TEXT
);

CREATE TABLE musicians (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  stage_name   TEXT,
  instrument_id INTEGER REFERENCES instruments(id)
);

INSERT INTO instruments (name, brand) VALUES ('Grand Piano', 'Yamaha');
INSERT INTO instruments (name, brand) VALUES ('Guitar', 'Fender');
INSERT INTO instruments (name, brand) VALUES ('Violin', 'Yamaha');
INSERT INTO instruments (name, brand) VALUES ('Tuba', 'Yamaha');
INSERT INTO instruments (name, brand) VALUES ('Baritone Saxophone', 'Yamaha');
INSERT INTO instruments (name, brand) VALUES ('Bass Guitar', 'Gretsch');

INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Julien', 'Señor Gaga', 1);
INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Edgar', 'Magic Ed', 2);
INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Théo', 'Grey Master Flash', 2);
INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Julie', 'Jewels', 5);
INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Berker', 'DJ St-Tite', 4);
INSERT INTO musicians (name, stage_name, instrument_id) VALUES ('Francis', 'Petit Poulet', 3);