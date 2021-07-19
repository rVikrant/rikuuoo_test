import * as Koa from 'koa'

const authentication = async (ctx:Koa.Context,next: Function)=>{

   console.log('hello auth')

    await next();
}

export default authentication;