# notes-webapp-react

Notes Webapp React is an HTML5 client for notes-webserver

# Status

This application is under heavy development, is not production ready yet.

# Unit tests

```
$ npm run test
```

# Run locally

Create a file called `.env.development` in this folder with the followin contents:

```
# point to notes webserver
API_ROOT=http://localhost:3000
```

You can change VITE_API_ROOT to point to your API Gateway endpoint.

When you have the environment file, run either with Webpack or Vite.

## Run with Webpack

```
$ npm start
```

Open `http://localhost:8080` in your web browser

### Enable code coverage when running with webpack:

Run with the environment variable `WEBPACK_COVERAGE` set to `true`:

```
$ WEBPACK_COVERAGE=true npm start
```

## Run with Vite

```
$ npm run start-vite
```

Open `http://localhost:8080/html/index.html` in your web browser
