"use strict";

//dependencies
import * as Joi from '@hapi/joi';
import { request, summary, tags, body, prefix, middlewares } from 'koa-swagger-decorator';

// local dependencies
import { ENV_CONFIG, MIDDLEWARE, STATUS_MSG } from "../../config";
import { sendSuccess } from "../../utils/helper";
import { getMiddleware, validate } from '../../middlewares';
import { userControllerV1 } from "../../controllers/v1/user.controller";


const tag = tags["user"];

@prefix("/users")
export default class User {
    @request('post', '/')
    @summary("fetch users api")
    @tag
    @body({
        groups: { type: 'object' },
        perPage: { type: 'number', required: true },
        pageNumber: { type: 'number', required: true },
    })
    @middlewares([
        ...getMiddleware([]),
        validate({
            body: {
                groups: Joi.object().error(new Error(STATUS_MSG.ERROR.RIKUUOO.E422.VALIDATION_ERROR.type)),
                perPage: Joi.number().valid(10, 30, 50).required().error(new Error(STATUS_MSG.ERROR.RIKUUOO.E422.INVALID_PER_PAGE_LIMIT.type)),
                pageNumber: Joi.number().required().min(1).error(new Error(STATUS_MSG.ERROR.RIKUUOO.E422.INVALID_PAGE_NO.type)),
            }
        })
    ])
    public async fetchUsers(ctx) {
        try {
            console.log(" get users route");
            let payload: IUserRequestV1.IFetchUsers = ctx.request.body;

            let res = await userControllerV1.fetchUsers(payload);

            let sendResponse = sendSuccess(STATUS_MSG.SUCCESS.RIKUUOO.S200.DEFAULT_SUCCESS, ENV_CONFIG.DATABASE.LANGUAGE.EN, res);
            ctx.status = sendResponse.statusCode;
            ctx.body = sendResponse
        } catch (e) {
            console.log("error in get users route ---", e);
            throw e;
        }
    }
}