import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";

//mongodb connection
import * as connect from "./db/connection";

const app = new Koa();
const router = new Router();

//Middleware
app.use(json());
app.use(logger());


router.get('/',async (ctx,next)=>{
    console.log(ctx);
    ctx.body = {msg:'hello world'};
    await next();
})


//routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('koa started')
})

