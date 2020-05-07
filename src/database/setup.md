### Previous requirements

Have requests python package installed

## Commands only to Linux

```
pip3 install requests
```

Install postgresql

[postgresql installation guide](https://www.digitalocean.com/community/tutorials/como-instalar-y-utilizar-postgresql-en-ubuntu-18-04-es)

### Create DB and use it

```
CREATE DATABASE music_player WITH ENCODING = "UTF8";
```

```
\c music_player
```

### Execute the database.sql file on the new DB

```
sudo -u postgres psql -d music_player -f route/to/database.sql
```

database.sql is on ["/src/database/sql/database.sql"](/src/database/sql/database.sql)

### Generate the dummy data

Execute the fake_data_generator.py file with python, this file is on
/music_player_backend/src/database

```
python3 fake_data_generator.py 100 output.sql
```

Now you have an output.sql file, you must run it on your db.

```
sudo -u postgres psql -d music_player -f route/to/output.sql
```
