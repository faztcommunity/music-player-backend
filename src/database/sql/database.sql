-- -----------------------------------------------------
-- Schema musicPlayer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicPlayer` DEFAULT CHARACTER SET utf8 ;
USE `musicPlayer` ;

-- -----------------------------------------------------
-- Table `musicPlayer`.`artists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`artists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`albums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`albums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`songs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `duration` TIME NOT NULL,
  `album_id` INT NOT NULL,
  `song_bytes` BINARY NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_songs_albums1_idx` (`album_id` ASC) VISIBLE,
  CONSTRAINT `fk_songs_albums1`
    FOREIGN KEY (`album_id`)
    REFERENCES `musicPlayer`.`albums` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`lists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`lists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lists_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_lists_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `musicPlayer`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`lists_songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`lists_songs` (
  `song_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  INDEX `fk_lists_songs_songs1_idx` (`song_id` ASC),
  INDEX `fk_lists_songs_lists1_idx` (`list_id` ASC),
  CONSTRAINT `fk_lists_songs_songs1`
    FOREIGN KEY (`song_id`)
    REFERENCES `musicPlayer`.`songs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lists_songs_lists1`
    FOREIGN KEY (`list_id`)
    REFERENCES `musicPlayer`.`lists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`artists_songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`artists_songs` (
  `song_id` INT NOT NULL,
  `artist_id` INT NOT NULL,
  INDEX `fk_artists_songs_songs1_idx` (`song_id` ASC),
  INDEX `fk_artists_songs_artists1_idx` (`artist_id` ASC),
  CONSTRAINT `fk_artists_songs_songs1`
    FOREIGN KEY (`song_id`)
    REFERENCES `musicPlayer`.`songs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artists_songs_artists1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `musicPlayer`.`artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `musicPlayer`.`artists_albums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicPlayer`.`artists_albums` (
  `album_id` INT NOT NULL,
  `artist_id` INT NOT NULL,
  INDEX `fk_artists_albums_albums1_idx` (`album_id` ASC),
  INDEX `fk_artists_albums_artists1_idx` (`artist_id` ASC),
  CONSTRAINT `fk_artists_albums_albums1`
    FOREIGN KEY (`album_id`)
    REFERENCES `musicPlayer`.`albums` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artists_albums_artists1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `musicPlayer`.`artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;
