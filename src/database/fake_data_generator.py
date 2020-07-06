"""
Command-line program to generate fake data and database inserts
Usage: python fake_data_generator.py <amount> <output file>
Example: python fake_data_generator.py 100 output.sql
"""
import os
import uuid
import random
import requests
import binascii
from datetime import datetime

def get_uuid():
    return str(uuid.uuid4())


def sql_insert(table_name, **kwargs):
    keys = []
    values = []
    for key, value in kwargs.items():
        keys.append(key)
        add_quotes = True
        if isinstance(value, dict):
            add_quotes = value['add_quotes']
            value = value['value']
        if add_quotes:
            value = f"'{value}'"
        values.append(value)

    keys = ', '.join(keys)
    values = ', '.join(values)

    return f'INSERT INTO {table_name} ({keys}) VALUES ({values});'


def generate_users(amount):
    users = {}
    res = requests.get("https://randomuser.me/api/", params={"results": amount})
    data = res.json()
    for user in data["results"]:
        user_id = get_uuid()
        username = user["login"]["username"]
        email = user["email"]
        password = user["login"]["password"]
        createdAt = datetime.now()
        updatedAt = datetime.now()

        user_sql = sql_insert('users',
            id=user_id,
            name=username,
            email=email,
            password=password,
            created_at=createdAt,
            updated_at=updatedAt
        )
        users[user_id] = user_sql

    return users


def get_random_names(amount):
    res = requests.get("http://names.drycodes.com/" + str(amount))
    data = res.json()
    return map(lambda x: x.replace("_", " "), data)


class SQLGenerator:
    @staticmethod
    def generate(amount, table_name, **kwargs):
        generated = {}

        for name in get_random_names(amount):
            id = get_uuid()
            if not kwargs:
                _kwargs = {'id': id, 'name': name}
            generated_sql = sql_insert(table_name, **_kwargs)
            generated[id] = generated_sql

        return generated

    @staticmethod
    def generate_many_to_many(amount, table_name, lists, field_names):
        generated = {}

        for _ in range(amount):
            one_id = random.choice(lists[0])
            two_id = random.choice(lists[1])

            generated_sql = sql_insert(table_name, **{field_names[0]: one_id, field_names[1]: two_id})
            generated[(one_id, two_id)] = generated_sql

        return generated


def generate_lists(amount, users_id):
    lists = {}

    for list_name in get_random_names(amount):
        list_id = get_uuid()
        list_sql = sql_insert('lists', id=list_id, name=list_name, user_id=random.choice(users_id))
        lists[list_id] = list_sql

    return lists


def get_random_bytes():
    return f"decode('{binascii.b2a_hex(os.urandom(15)).decode()}', 'hex')"


def generate_songs(amount, albums):
    songs = {}

    for song in get_random_names(amount):
        song_id = get_uuid()
        duration = random.randint(100, 300)
        song_sql = sql_insert('songs', id=song_id, name=song, duration=duration, album_id=random.choice(albums),
                              song_bytes={'value': get_random_bytes(), 'add_quotes': False})
        songs[song_id] = song_sql

    return songs


def generate_data(amount, result_file):
    titles = ["USERS", "LISTS", "ALBUMS", "ARTISTS", "ARTISTS_ALBUMS", "SONGS", "LISTS_SONGS", "ARTISTS_SONGS"]
    users = generate_users(amount)
    lists = generate_lists(amount, list(users.keys()))
    albums = SQLGenerator.generate(amount, 'albums')
    albums_keys = list(albums.keys())
    artists = SQLGenerator.generate(amount, 'artists')
    artists_keys = list(artists.keys())
    artists_albums = SQLGenerator.generate_many_to_many(amount, 'artists_albums', [albums_keys, artists_keys], ['album_id', 'artist_id'])
    songs = generate_songs(amount, albums_keys)
    songs_keys = list(songs.keys())
    lists_songs = SQLGenerator.generate_many_to_many(amount, 'lists_songs', [songs_keys, list(lists.keys())], ['song_id', 'list_id'])
    artists_songs = SQLGenerator.generate_many_to_many(amount, 'artists_songs', [songs_keys, artists_keys], ['song_id', 'artist_id'])

    with open(result_file, "w") as file:
        for title, lines in zip(titles, map(lambda x: list(x.values()), (users, lists, albums, artists, artists_albums, songs, lists_songs, artists_songs))):
            file.write(f"--{title}\n\n")
            for line in lines:
                file.write(f"{line}\n")
            file.write("\n\n")


def main():
    import sys
    args = sys.argv[1:]
    usage = f"Correct usage: python {sys.argv[0]} <amount> <output>\nExample: python {sys.argv[0]} 100 fake.sql"
    if len(args) != 2:
        print("Invalid usage!")
        print(usage)
    else:
        if not args[0].isdigit():
            print("Invalid usage! <amount> must be a integer")
            print(usage)
            return

        print(f"Generating file {args[1]!r}...")

        generate_data(int(args[0]), args[1])

        print("Done!")


if __name__ == "__main__":
    main()
