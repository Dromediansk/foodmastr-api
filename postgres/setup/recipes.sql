BEGIN TRANSACTION;

CREATE TABLE recipes (
	id serial PRIMARY KEY,
	user_id serial REFERENCES users,
	image_id serial REFERENCES images,
	description text,
	likes_count int NOT NULL,
	created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;