BEGIN TRANSACTION;

CREATE TYPE lang AS ENUM ( 'EN', 'SK' );

CREATE TABLE users (
	id serial PRIMARY KEY,
	email text UNIQUE NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
  country VARCHAR(100),
  current_lang lang NOT NULL,
	joined timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;