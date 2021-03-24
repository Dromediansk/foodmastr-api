BEGIN TRANSACTION;

CREATE TABLE record_accounts (
	id serial PRIMARY KEY,
	name text NOT NULL
);

COMMIT;