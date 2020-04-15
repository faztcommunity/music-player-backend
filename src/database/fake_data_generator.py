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


def get_uuid():
    return str(uuid.uuid4())


def generate_users(amount):
    users = {}
    res = requests.get("https://randomuser.me/api/", params={"results": amount})
    data = res.json()
    for user in data["results"]:
        email = user["email"]
        username = user["login"]["username"]
        password = user["login"]["password"]
        user_id = get_uuid()

        user_sql = f"INSERT INTO users (id, name, email, password) VALUES ('{user_id}', '{username}', '{email}', '{password}');"
        users[user_id] = user_sql

    return users


def get_random_names(amount):
    res = requests.get("http://names.drycodes.com/" + str(amount))
    data = res.json()
    return map(lambda x: x.replace("_", " "), data)


def generate_lists(amount, users_id):
    lists = {}

    for list_name in get_random_names(amount):
        list_id = get_uuid()
        list_sql = f"INSERT INTO lists (id, name, user_id) VALUES ('{list_id}', '{list_name}', '{random.choice(users_id)}');"
        lists[list_id] = list_sql

    return lists


def generate_albums(amount):
    albums = {}

    for album in get_random_names(amount):
        album_id = get_uuid()
        album_sql = f"INSERT INTO albums (id, name) VALUES ('{album_id}', '{album}');"
        albums[album_id] = album_sql

    return albums


def generate_artists(amount):
    artists = {}

    for artist in get_random_names(amount):
        artist_id = get_uuid()
        artist_sql = f"INSERT INTO artists (id, name) VALUES ('{artist_id}', '{artist}');"
        artists[artist_id] = artist_sql

    return artists


def generate_artists_albums(amount, artists, albums):
    artists_albums = {}

    for _ in range(amount):
        album_id = random.choice(albums)
        artist_id = random.choice(artists)
        artist_album_sql = f"INSERT INTO artists_albums (album_id, artist_id) VALUES ('{album_id}', '{artist_id}');"
        artists_albums[(album_id, artist_id)] = artist_album_sql

    return artists_albums


def get_random_bytes():
    return f"decode('{binascii.b2a_hex(os.urandom(15)).decode()}', 'hex')"


def generate_songs(amount, albums):
    songs = {}

    for song in get_random_names(amount):
        song_id = get_uuid()
        duration = random.randint(100, 300)
        song_sql = f"INSERT INTO songs (id, name, duration, album_id, song_bytes) VALUES ('{song_id}', '{song}', {duration}, '{random.choice(albums)}', {get_random_bytes()});"
        songs[song_id] = song_sql

    return songs


def generate_lists_songs(amount, songs, lists):
    lists_songs = {}

    for _ in range(amount):
        song_id = random.choice(songs)
        list_id = random.choice(lists)
        list_song_sql = f"INSERT INTO lists_songs (song_id, list_id) VALUES ('{song_id}', '{list_id}');"
        lists_songs[(song_id, list_id)] = list_song_sql

    return lists_songs


def generate_artists_songs(amount, songs, artists):
    artists_songs = {}

    for _ in range(amount):
        song_id = random.choice(songs)
        artist_id = random.choice(artists)
        artist_song_sql = f"INSERT INTO artists_songs (song_id, artist_id) VALUES ('{song_id}', '{artist_id}');"
        artists_songs[(song_id, artist_id)] = artist_song_sql

    return artists_songs


def generate_data(amount, result_file):
    titles = ["USERS", "LISTS", "ALBUMS", "ARTISTS", "ARTISTS_ALBUMS", "SONGS", "LISTS_SONGS", "ARTISTS_SONGS"]
    users = generate_users(amount)
    lists = generate_lists(amount, list(users.keys()))
    albums = generate_albums(amount)
    artists = generate_artists(amount)
    artists_albums = generate_artists_albums(amount, list(artists.keys()), list(albums.keys()))
    songs = generate_songs(amount, list(albums.keys()))
    lists_songs = generate_lists_songs(amount, list(songs.keys()), list(lists.keys()))
    artists_songs = generate_artists_songs(amount, list(songs.keys()), list(artists.keys()))

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
