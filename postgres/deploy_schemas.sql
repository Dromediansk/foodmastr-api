-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/setup/users.sql'
\i '/docker-entrypoint-initdb.d/setup/images.sql'
\i '/docker-entrypoint-initdb.d/setup/recipes.sql'
\i '/docker-entrypoint-initdb.d/setup/followers.sql'
\i '/docker-entrypoint-initdb.d/setup/login.sql'

\i '/docker-entrypoint-initdb.d/seed/insertions.sql'