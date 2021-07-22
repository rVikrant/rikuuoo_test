'use strict';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../config'
import { consolelog, bCryptData, compareCryptData } from '../../utils/helper';

export class UserEntityV1 extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.OWNER)
    }

    async saveUser(payload: {
        email: string,
        password: string
    }) {
        try {

            payload.password = await bCryptData(payload.password);

            return await this.createOneEntityMdb(payload);
        } catch (e) {
            throw e;
        }
    }

    async logoutUser(id: string) {
        try {

            await this.updateOneEntityMdb({
                _id: globalThis.ObjectId(id)
            }, {
                $set: {
                    issuedAt: 0
                }
            });

            return {};
        } catch (e) {
            throw e;
        }
    }

    async loginUser(payload: {
        email: string,
        password: string
    },
    tokenType: string) {
        try {

            let options: any = {
                lean: true
            };

            let criteria: any = {
                email: payload.email
            };

            let user: any = await this.getOneEntityMdb(criteria, {
                __v: 0,
            });

            console.log("Owner---data--", user);


            if(user && user._id) {
                if(await compareCryptData(payload.password, user.password)) {
                    delete user.password;

                    user.accessToken = await this.createTokenAndUpdateUser({id: user._id, tokenType});

                    return user;
                } else {
                    throw Constant.STATUS_MSG.ERROR.BELIEVING.E400.INVALID_PASSWORD
                }
            } else {
                throw Constant.STATUS_MSG.ERROR.BELIEVING.E400.INVALID_EMAIL
            }
        } catch (e) {
            throw e;
        }
    }

    async createTokenAndUpdateUser(data : {
        id: string,
        tokenType: string
    }) {
        try {
            let tokenData = {
                id: data.id,
                tokenType: data.tokenType,
                issuedAt: Date.now()
            };

            let token = await this.createToken(tokenData);

            await this.updateOneEntityMdb({
                _id: globalThis.ObjectId(tokenData.id)
            }, {
                $set: {
                    issuedAt: tokenData.issuedAt
                }
            });

            return token.token;

        } catch (e) {
            throw e;
        }
    }
}

export const UserEV1 = new UserEntityV1()
