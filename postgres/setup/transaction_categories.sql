BEGIN TRANSACTION;

CREATE TABLE transaction_categories (
	id serial PRIMARY KEY,
	name text NOT NULL
);

COMMIT;