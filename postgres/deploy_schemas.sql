-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/setup/types.sql'
\i '/docker-entrypoint-initdb.d/setup/record_categories.sql'
\i '/docker-entrypoint-initdb.d/setup/record_accounts.sql'
\i '/docker-entrypoint-initdb.d/setup/users.sql'
\i '/docker-entrypoint-initdb.d/setup/records.sql'
\i '/docker-entrypoint-initdb.d/setup/login.sql'

\i '/docker-entrypoint-initdb.d/seed/insertions.sql'