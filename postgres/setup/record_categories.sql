BEGIN TRANSACTION;

CREATE TABLE record_categories (
	id serial PRIMARY KEY,
	name text NOT NULL
);

COMMIT;