
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

(database.sql is on /music_player_backend/src/database/sql)

### Generate the dummy data 
execute the fake_data_generator.py file whit python, this file is on /music_player_backend/src/database
```
python3 fake_data_generator.py 100 output.sql
```
Now you hace a output.sql file, you must run it on your db 
```
sudo -u postgres psql -d music_player -f route/to/output.sql
```

