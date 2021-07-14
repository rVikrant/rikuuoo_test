import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import bodyParser = require("koa-bodyparser");
import { koaSwagger } from 'koa2-swagger-ui';

// npm start for demo

//importing routes (localhost:3000/demo/home)
import {routes}  from "./routes/router"; 

//mongodb connection
import * as connect from "./database/connection";


const app = new Koa();
const router = new Router();

//Middleware
app.use(json());
app.use(logger());
app.use(bodyParser());

//customMiddleware's
app.use(routes);


// app.use(
//     koaSwagger({
//         routePrefix: '/swagger', // host at /swagger instead of default /docs
//         swaggerOptions: {
//             url: '', // example path to json
//         },
//     }),
// );

//routes
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
    console.log('koa started')
})

