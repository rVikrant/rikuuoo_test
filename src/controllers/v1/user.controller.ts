"use strict";

// local dependencies
import * as ENTITY from '../../entity';
class UserControllerV1 {

    constructor() { };

    /**
    * @method GET
    * @param {number} pageNumber : page no
    * @param {number} perPage : docs limit per page
    * @param {object} groups : groups name to fetch data as per group
    * */
    async fetchUsers(payload: IUserRequestV1.IFetchUsers) {
        try {
            // console.log("fetchUsers controller------");

            let res: any = {};

            if(payload.groups && Object.keys(payload.groups).length) {
                let data = await ENTITY.UserGroupEV1.fetchGroupUsers(payload);

                for(let group of Object.keys(payload.groups)) {
                    res[group] = {
                        data: data[group] && data[group][0] && data[group][0].users || [],
                        pagination: {
                            perPage: payload.groups[group].perPage,
                            pageNumber: payload.groups[group].pageNumber,
                            totalCount: data[group] && data[group][0] && data[group][0].totalCount || 0
                        }
                    }
                }
            } else {
                let {totalCount, data} = await ENTITY.UserEV1.fetchUsers(payload);

                res = {
                    data,
                    pagination: {
                        perPage: payload.perPage,
                        pageNumber: payload.pageNumber,
                        totalCount
                    }
                }
            }

            return res;
        } catch (e) {
            // console.log("error in fetch users controller--", e);
            throw e;
        }
    }
}

export const userControllerV1 = new UserControllerV1();