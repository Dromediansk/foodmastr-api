BEGIN TRANSACTION;

CREATE TABLE records (
	id serial PRIMARY KEY,
	type record_type NOT NULL,
	user_id serial REFERENCES users NOT NULL,
	amount int NOT NULL,
	currency currency_type NOT NULL DEFAULT 'EUR',
	category_id serial REFERENCES record_categories NOT NULL,
	account_id serial REFERENCES record_accounts NOT NULL,
	description text,
	created DATE NOT NULL DEFAULT CURRENT_DATE
);

COMMIT;