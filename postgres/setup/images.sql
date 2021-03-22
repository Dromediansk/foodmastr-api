BEGIN TRANSACTION;

CREATE TYPE image_format AS ENUM ( 'JPG', 'PNG' );

CREATE TABLE images (
	id serial PRIMARY KEY,
	user_id serial NOT NULL,
	format image_format,
	is_profile boolean DEFAULT false NOT NULL,
	created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;