# Widget v2 (R & D)

## Steps
- Build the vue app
- Run the server
- Embed the code
- See the demo

## Prerequisite
Requires [Node.js](https://nodejs.org/) v20.19.4 to run.

## Run vue app
 App | Paths |
| ------ | ------ |
| Source | `widget-v2/src/App.vue` |
| Build | `widget-v2/dist/js/*` |

 Widget v2 | Paths |
| ------ | ------ |
| Source | `widget-v2/src/VetstoriaWidget.vue` |
| Build | `widget-v2/dist/wc/*` |

Install the dependencies and start the server by following these steps:

```sh
cd app-vue-2
npm i
npm run dev
npm run build:all (appication and web component)
```

## Run server
Install the dependencies and start the server by following these steps:

```sh
cd server
npm i
npm run start
```

Server runs on below port,

```sh
http://localhost:3000
```

## Widget's embed
The embed script runs on `http://localhost:3000`.

Embed Code:

```sh
<!-- Start vetstoria embed code -->
<vetstoria-widget initial-posts-per-page="9" initial-widget-title="This is a demo widget"></vetstoria-widget><script src="http://localhost:3000/wc/vetstoria-widget.min.js"></script>
<!-- End vetstoria embed code -->
```

## See the demo
Navigate to the folder below and open `index.html` in a web browser.

```sh
cd demos/demo-2
```