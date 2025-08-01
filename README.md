# Widget (R & D)

## Steps

- Run the server
- Build the vue app
- Embed the code

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

## Run Vue app
Install the dependencies and devDependencies and start the server.

```sh
cd app-vue
npm i
npm run dev
npm run build (production)
```

## Widget's Embed

Replace `JS-NAME` with the actual Vue app build JS filename in the path below.

```sh
app-vue/dist/assets
```

Embed Code:

```sh
<vetstoria-widget />
<script type="module" src="http://localhost:3000/assets/<JS-NAME>.js"></script>
```