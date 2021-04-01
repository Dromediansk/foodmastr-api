BEGIN TRANSACTION;

CREATE TABLE users (
	id serial PRIMARY KEY,
	email text UNIQUE NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	balance int DEFAULT 0,
	currency currency_type DEFAULT 'EUR',
  current_lang lang_type DEFAULT 'SK',
	joined timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;