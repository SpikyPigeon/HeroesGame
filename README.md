# ReactHeroes Game

Production version of the ReactHeroes Game

## Development Setup

You need some programs installed to make things work :

- NodeJS (latest 12.x)

- Yarn (latest version)

- PostgreSQL (version 12.1)

### PostgreSQL Config

In pgAdmin, you need to create a new user (with login rights) named `heroes` with password `ReactHeroes`. Then create a database named `heroes` owned by the user `heroes`.

You need to execute this request too, before starting the app : `CREATE EXTENSION "pgcrypto";`.

### Running the App

Once all of them are installed, open a command prompt in the root of the repository and run :

```bash
yarn #will install all dependencies
yarn start #will run the server
yarn migration:run
```

The start script run the development version of the backend, which hosts the frontend with Hot Reload, on port 3000.

## Production Setup

You need the same programs and setup as the dev version, but running the app is different :

```bash
yarn #will install all dependencies
yarn api:build #will build the backend
yarn app:prod #will build the production version of the frontend
yarn api:prod #will run the backend in production which host the frontend
```

The app will be running on port 3000.


