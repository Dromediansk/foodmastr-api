BEGIN TRANSACTION;

CREATE TABLE record_categories (
	id serial PRIMARY KEY,
	user_id serial REFERENCES users NOT NULL,
	name text NOT NULL
);

COMMIT;