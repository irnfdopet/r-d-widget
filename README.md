# Widget v2 (R & D)

## Steps

- Build the vue app
- Run the server
- Embed the code

## Run Vue app
Install the dependencies and devDependencies and start the server.

```sh
cd app-vue-2
npm i
npm run dev
npm run build:all (appication and web component)
```

## Run server

Requires [Node.js](https://nodejs.org/) v20.19.4 to run.

Install the dependencies and devDependencies and start the server.

```sh
cd server
npm i
npm run start
```

Server runs on below port,

```sh
http://localhost:3000
```

## Widget's Embed

The embed script runs on `http://localhost:3000`.

Embed Code:

```sh
<!-- Start vetstoria embed code -->
<vetstoria-widget initial-posts-per-page="9" initial-widget-title="This is a demo widget"></vetstoria-widget><script src="http://localhost:3000/wc/vetstoria-widget.min.js"></script>
<!-- End vetstoria embed code -->
```