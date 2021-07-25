import * as Koa from "koa";
import * as Router from "koa-router";

// npm start for demo

//importing routes (localhost:3000/demo/home)
import { bootstrap } from './utils/bootstrap';
import middleware from './middlewares';
import route from './routes';

const app = new Koa();
const router = new Router();

//Middleware
app.use(middleware());

//customMiddleware's
// @ts-ignore
app.use(route.routes());
app.proxy = true;

//routes
// app.use(router.routes()).use(router.allowedMethods());


export const start = (async () => {
    try {
        const port = process.env.port;

        const server = app.listen(port);

        process.on('unhandledRejection', (reason, promise) => {
            console.log(`${process.env.service_name} unhandled rejection due to : `, promise, 'reason:', reason);
        });

        await bootstrap(server);

        console.log("running on port", port);

    } catch (error) {
        console.error(error)
    }
})()

