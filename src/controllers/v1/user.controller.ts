"use strict";

// local dependencies
import {UserEV1} from '../../entity';
import {STATUS_MSG, ENV_CONFIG} from '../../config';

class OwnerControllerV1 {

    constructor() { };

    /**
    * @method POST
    * @param {string} email : user email
    * @param {string} password : user password min 6 chars
    * */
    async save(payload: IOwnerRequestV1.IOwnerSignIn) {
        try {
            console.log("add Owner controller------");

            //@ts-ignore
            payload.password = await bCryptData(payload.password);

            let newUser:any = await UserEV1.saveUser(payload);
            let token: string = await UserEV1.createTokenAndUpdateUser({id: newUser._id, tokenType: ENV_CONFIG.DATABASE.TYPE.TOKEN.OWNER_AUTH});

            newUser.accessToken = token;

            return newUser;
        } catch (e) {
            console.log("error in add Owner--", e);
            throw e;
        }
    }

    async login(payload: IOwnerRequestV1.IOwnerSignIn) {
        try {
            console.log("login Owner controller------");

            return await UserEV1.loginUser(payload, ENV_CONFIG.DATABASE.TYPE.TOKEN.OWNER_AUTH);
        } catch (e) {
            console.log("error in login Owner--", e);
            throw e;
        }
    }

    /**
    * @method POST
    * */
    async logout(user: any) {
        try {
            console.log("Owner logout fn controller---");
            await UserEV1.logoutUser(user.id || user._id);
    
            return {};

        } catch(e) {
            throw e;
        }

    }
}

export const ownerControllerV1 = new OwnerControllerV1();