-- -----------------------------------------------------
-- Database music_player
-- -----------------------------------------------------
CREATE DATABASE music_player WITH ENCODING = "UTF8";
-- Select manually created database
-- -----------------------------------------------------
-- Table public.artists
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.artists (
  "id" UUID NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  PRIMARY KEY ("id")
);
-- -----------------------------------------------------
-- Table public.albums
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.albums (
  "id" UUID NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  CONSTRAINT "pk_albums_id" PRIMARY KEY ("id")
);
-- -----------------------------------------------------
-- Table public.songs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.songs (
  "id" UUID NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "duration" TIME NOT NULL,
  "album_id" UUID NOT NULL,
  "song_bytes" BYTEA NULL,
  CONSTRAINT "pk_songs_id" PRIMARY KEY ("id"),
  CONSTRAINT "fk_songs_albums" FOREIGN KEY ("album_id") REFERENCES public.albums ("id")
);
-- -----------------------------------------------------
-- Table public.users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  "id" UUID NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "email" VARCHAR(45) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  CONSTRAINT "pk_users_id" PRIMARY KEY ("id")
);
-- -----------------------------------------------------
-- Table public.lists
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lists (
  "id" UUID NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  "user_id" UUID NOT NULL,
  CONSTRAINT "pk_lists_id" PRIMARY KEY ("id"),
  CONSTRAINT "fk_lists_users" FOREIGN KEY ("user_id") REFERENCES public.users ("id")
);
-- -----------------------------------------------------
-- Table public.lists_songs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lists_songs (
  "song_id" UUID NOT NULL,
  "list_id" UUID NOT NULL,
  CONSTRAINT "fk_lists_songs_songs" FOREIGN KEY ("song_id") REFERENCES public.songs ("id"),
  CONSTRAINT "fk_lists_songs_lists" FOREIGN KEY ("list_id") REFERENCES public.lists ("id")
);
-- -----------------------------------------------------
-- Table public.artists_songs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.artists_songs (
  "song_id" UUID NOT NULL,
  "artist_id" UUID NOT NULL,
  CONSTRAINT "fk_artists_songs_songs" FOREIGN KEY ("song_id") REFERENCES public.songs ("id"),
  CONSTRAINT "fk_artists_songs_artists" FOREIGN KEY ("artist_id") REFERENCES public.artists ("id")
);
-- -----------------------------------------------------
-- Table public.artists_albums
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.artists_albums (
  "album_id" UUID NOT NULL,
  "artist_id" UUID NOT NULL,
  CONSTRAINT "fk_artists_albums_albums" FOREIGN KEY ("album_id") REFERENCES public.albums ("id"),
  CONSTRAINT "fk_artists_albums_artists" FOREIGN KEY ("artist_id") REFERENCES public.artists ("id")
);