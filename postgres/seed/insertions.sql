BEGIN TRANSACTION;

INSERT INTO users(email, first_name, last_name, country, current_lang, joined) VALUES ('test@user.com', 'Carl', 'Borough', 'Slovakia', 'SK', '2021-01-01');

COMMIT;