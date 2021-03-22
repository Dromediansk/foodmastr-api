FROM postgres:13.2

ADD /setup/ /docker-entrypoint-initdb.d/setup/
ADD /seed/ /docker-entrypoint-initdb.d/seed/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/