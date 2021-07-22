"use strict";

//dependencies
import * as bcrypt from "bcryptjs";

// local dependencies
import {STATUS_MSG} from '../../config/message.constant';
import { BaseService } from "../../services";
import { authService } from "../../services/auth";

const bCryptData = async (data) => {             // bcryptjs encryption
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(data, salt).then(result => {
                resolve(result)
            })
        })
    })
};

const compareCryptData = (data, hash) => {       // bcryptjs matching
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, hash).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
};

class OwnerControllerV1 {

    constructor() { };

    OwnerDao = new BaseService("Owner");

    async save(payload: IOwnerRequestV1.IOwnerSignIn) {
        try {
            console.log("add Owner controller------");

            //@ts-ignore
            payload.password = await bCryptData(payload.password);

            await this.OwnerDao.updateOneEntityMdb({email: payload.email}, {$set: payload}, {upsert: true});

            return {};
        } catch (e) {
            console.log("error in add Owner--", e);
            throw e;
        }
    }

    async login(payload: IOwnerRequestV1.IOwnerSignIn) {
        try {
            console.log("login Owner controller------");

            let options: any = {
                lean: true
            };

            let criteria: any = {
                email: payload.email
            };

            let Owner: any = await this.OwnerDao.getOneEntityMdb(criteria, {
                __v: 0,
            });

            console.log("Owner---data--", Owner);


            if(Owner) {
                if(await compareCryptData(payload.password, Owner.password)) {
                    delete Owner.password;

                    let tokenIssuedAt = Date.now();
                    let token = await authService.createToken({
                        id: Owner.id || Owner._id,
                        tokenType: "Owner_AUTH",
                        issuedAt: tokenIssuedAt
                    });

                    console.log("Owner---",token);

                    Owner.accessToken = token.token;

                    await this.OwnerDao.updateOneEntityMdb({
                        _id: Owner.id || Owner._id
                    }, {
                        $set: {
                            issuedAt: tokenIssuedAt
                        }
                    });

                    return Owner;
                } else {
                    throw STATUS_MSG.ERROR.BELIEVING.E400.INVALID_PASSWORD
                }
            } else {
                throw STATUS_MSG.ERROR.BELIEVING.E400.INVALID_EMAIL
            }
        } catch (e) {
            console.log("error in login Owner--", e);
            throw e;
        }
    }

    async logout(Owner: any) {
        try {
            console.log("Owner logout fn controller---");

            await this.OwnerDao.updateOneEntityMdb({
                _id: Owner.id || Owner._id
            }, {
                $set: {
                    issuedAt: 0
                }
            });
    
            return {};

        } catch(e) {
            throw e;
        }

    }
}

export const ownerControllerV1 = new OwnerControllerV1();