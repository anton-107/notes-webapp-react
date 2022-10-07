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

You can change API_ROOT to point to your API Gateway endpoint.

When you have the environment file, run:

```
$ npm start
```
