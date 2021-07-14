import * as Router from "koa-router";
import * as Koa from "koa"

const router = new Router();

//home page get api
router.get('/home', (cxt: Koa.Context, next: Function) => {

    console.log('hello from demo')

    cxt.body = { msg: 'heyyy' }
    next();
})

//home page post api
router.post('/home', async (cxt: Koa.Context, next: Function) => {

    console.log("BODY :: ",cxt.request.body);
    console.log('hello from demo');

    cxt.body = { msg: cxt.request.body }
    next();
})

export const demoRouter = router.routes();
// export { router.routes()};