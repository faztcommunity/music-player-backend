# music-player-backend

<!-- TODO: Adding description -->

### Tecnologies

- Languages: `NodeJS` and `TypeScript`
- Framework: `Express`
- Database: `PostgreSQL`

### Starter

```sh
npm install # install all the dependecies

copy .env.example .env # create enviroments

npm run start:dev # start application in mode development
```

### Commands Start

```sh
npm run start:dev # development

npm run start:prod # production

npm start # server
```

---

### Endpoints

> API

    GET | api/

---

> USERS

    GET | api/users
    GET | api/users/{id}
    POST | api/users
    PATCH | api/users/{id}
    DELETE | api/users/{id}

---

> ALBUMS

    GET | api/albums
    GET | api/albums/{id}
    POST | api/albums
    PATCH | api/albums/{id}
    DELETE | api/albums/{id}

---

> SONGS

    GET | api/songs
    GET | api/songs/{id}
    POST | api/songs
    PATCH | api/songs/{id}
    DELETE | api/songs/{id}

---

> ARTISTS

    GET | api/artists
    GET | api/artists/{id}
    POST | api/artists
    PATCH | api/artists/{id}
    DELETE | api/artists/{id}

---

> LISTS

    GET | api/lists
    GET | api/lists|{id}
    POST | api/lists
    PATCH | api/lists/{id}
    DELETE | api/lists/{id}

---

### Local database setup
[Database Instructions](src/database/setup.md)
