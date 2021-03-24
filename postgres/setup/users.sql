BEGIN TRANSACTION;

CREATE TABLE users (
	id serial PRIMARY KEY,
	email text UNIQUE NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	balance int NOT NULL DEFAULT 0,
	currency currency_type NOT NULL DEFAULT 'EUR',
  current_lang lang_type NOT NULL DEFAULT 'SK',
	joined timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;