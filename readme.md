## Faculty Calendar scheduler - SWE PROJECT
### Postgres + Express + ReactJS + NodeJS  [PERN]

    
- **Language** : Javascript
- **Frontend** : ReactJS 
- **Backend** : NodeJS , Express
- **Database** : Postgres 
- **ORM**: sequelize


### Setup Database

```bash
psql -U root

```

```psql
CREATE USER fcsadmin WITH PASSWORD '123456789';
CREATE DATABASE fcsdb OWNER fcsadmin;
GRANT ALL PRIVILEGES ON DATABASE fcsdb TO fcsadmin;
\c fcsdb;
\du

```
