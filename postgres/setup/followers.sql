BEGIN TRANSACTION;

CREATE TABLE followers (
	user_id serial REFERENCES users,
	follower_id serial REFERENCES users,
	PRIMARY KEY (user_id, follower_id),
	created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;