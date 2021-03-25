BEGIN TRANSACTION;

INSERT INTO users (email, first_name, last_name, balance, currency, current_lang, joined) VALUES ('sally@user.com', 'Sally', 'Testuser', 100, 'EUR', 'SK', '2021-01-01');

INSERT INTO login (hash, email) VALUES ('$2b$09$BlOWc1K3i3CMLX4lVO3dluRd8nA8ObDOv1awT2TWxcbky1AZ0nfNG', 'sally@user.com');

INSERT INTO record_accounts (name) VALUES ('Bank account');

INSERT INTO record_categories (name) VALUES ('Grocery');

INSERT INTO records (type, user_id, amount, currency, account_id, category_id, description) VALUES ('EXPENSE', 1, 20, 'EUR', 1, 1, 'Some stuff');


COMMIT;