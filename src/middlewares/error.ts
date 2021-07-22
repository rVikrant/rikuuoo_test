import { Middleware, Context } from 'koa'
import { sendError } from '../utils/helper'
import * as Constant from '../config'

export default (opts?): Middleware => {
  return async (ctx: Context, next) => {
    try {
      await next();
    } catch (error) {
      let language = ctx.request.header.language ? ctx.request.header.language : Constant.ENV_CONFIG.DATABASE.LANGUAGE.EN
      // @ts-ignore
      let errReturn: any = sendError(error, language);
      if (typeof error == 'string') {
        error = {
          message: error
        }
      } else if (errReturn.payload && errReturn.payload.hasOwnProperty('message')) {
        error.message = errReturn.payload.message;
      }
      ctx.status = errReturn.httpCode;
      ctx.body = errReturn.payload;
    }
  }
}