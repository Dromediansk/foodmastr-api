BEGIN TRANSACTION;

CREATE TABLE transaction_accounts (
	id serial PRIMARY KEY,
	name text NOT NULL
);

COMMIT;