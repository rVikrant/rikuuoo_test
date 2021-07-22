"use strict";

//dependencies
import * as Joi from '@hapi/joi';
import { request, summary, tags, query, body, prefix, middlewares, header, formData, swaggerClass, swaggerProperty,path, params } from 'koa-swagger-decorator';

// local dependencies
import { ENV_CONFIG, MIDDLEWARE, STATUS_MSG } from "../../config";
import { sendSuccess } from "../../utils/helper";
import { getMiddleware, validate } from '../../middlewares';
import { ownerControllerV1 } from "../../controllers/v1/user.controller";


const tag = tags["owner"];

@prefix("/owner")
export default class experience {
    @request('post', '/sign-in')
    @summary("owner login api i.e. 200 status")
    @tag
    @body({
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
    })
    @middlewares([
        ...getMiddleware([]),
        validate({
            body: {
                email: Joi.string().required().error(new Error(STATUS_MSG.ERROR.BELIEVING.E422.INVALID_EMAIL.type)),
                password: Joi.string().required().error(new Error(STATUS_MSG.ERROR.BELIEVING.E422.INVALID_PASSWORD.type)),
            }
        })
    ])
    public async signIn(ctx) {
        try {
            console.log(" sign in route");
            let payload: IOwnerRequestV1.IOwnerSignIn = ctx.request.body;

            let res = await ownerControllerV1.login(payload);

            let sendResponse = sendSuccess(STATUS_MSG.SUCCESS.BELIEVING.S200.LOGIN, ENV_CONFIG.DATABASE.LANGUAGE.EN, res);
            ctx.status = sendResponse.statusCode;
            ctx.body = sendResponse
        } catch (e) {
            console.log("error in sign in route ---", e);
            throw e;
        }
    }

    @request('post', '/sign-out')
    @summary("owner logout api i.e. 200 status")
    @tag
    @header({
        authorization: { type: 'string', required: true },
    })
    @middlewares([
        ...getMiddleware([
            MIDDLEWARE.AUTH
        ]),
        validate({
            header: {
                authorization: Joi.string().required().error(new Error(STATUS_MSG.ERROR.BELIEVING.E422.VALIDATION_ERROR.type))
            }
        })
    ])
    public async signOut(ctx) {
        try {
            console.log(" sign out owner route---");

            let res = await ownerControllerV1.logout(ctx.state.user);

            let sendResponse = sendSuccess(STATUS_MSG.SUCCESS.BELIEVING.S200.LOGOUT, ENV_CONFIG.DATABASE.LANGUAGE.EN, res);
            ctx.status = sendResponse.statusCode;
            ctx.body = sendResponse
        } catch (e) {
            console.log("error in sign out route ---", e);
            throw e;
        }
    }
}