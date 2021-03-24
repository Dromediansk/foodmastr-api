BEGIN TRANSACTION;

CREATE TYPE record_type as ENUM ('EXPENSE', 'INCOME');
CREATE TYPE currency_type as ENUM ('EUR', 'USD', 'CZK');

CREATE TYPE lang_type AS ENUM ( 'EN', 'SK', 'DE' );

COMMIT;