-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/setup/types.sql'
\i '/docker-entrypoint-initdb.d/setup/transaction_categories.sql'
\i '/docker-entrypoint-initdb.d/setup/transaction_accounts.sql'
\i '/docker-entrypoint-initdb.d/setup/users.sql'
\i '/docker-entrypoint-initdb.d/setup/transactions.sql'
\i '/docker-entrypoint-initdb.d/setup/login.sql'

\i '/docker-entrypoint-initdb.d/seed/insertions.sql'