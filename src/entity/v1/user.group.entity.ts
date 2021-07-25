'use strict';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../config'

export class UserGroupEntityV1 extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.GROUP)
    }

    async fetchGroupUsers(payload: any) {
        try {
            // consolelog(__filename, "fetchGroupUsers fn", "", true);

            let criteria = { status: Constant.ENV_CONFIG.DATABASE.TYPE.STATUS.ACTIVE };

            let facet = {};

            let groups: any = Object.keys(payload.groups);

            for (let group of groups) {
                let skip: number = (payload.pageNumber - 1) * payload.perPage;
                let limit: number = payload.perPage;
                let pageNumber = payload.pageNumber;

                if(typeof payload.groups[group] === "object") {
                    skip = (payload.groups[group]["pageNumber"] - 1) * payload.groups[group]["perPage"];
                    limit = payload.groups[group]["perPage"];
                    pageNumber = payload.groups[group]["pageNumber"];
                }

                facet[group] = [{
                    $match: { name: group }
                }, {
                    $lookup: {                                // fetch user data throuugh userInfo
                        from: Constant.SET_NAME.USER,
                        localField: "_id",
                        foreignField: "userGroupId",
                        as: "users"
                    }
                },{
                    $addFields: {
                        totalCount: { $size: {$ifNull: ["$users", []]}},
                    }
                },{
                    $addFields: {
                        users: {
                            $cond: {
                                if: {
                                    $and: [
                                        {$gt: ["$totalCount",0]},
                                        {$gt: ["$totalCount",skip]},
                                    ]
                                },
                                then: {$slice:["$users", skip, limit]},
                                else: []
                            }
                        }
                    }
                },{
                    $project: {
                        users: 1,
                        totalCount: 1
                    }
                }];
            }

            let pipe = [{
                $match: criteria
            }, {
                $facet: facet
            }];

            return (await this.aggregateEntityMdb(pipe))[0];
        } catch (e) {
            // consolelog(__filename, "fetch user groups entity error -------", e, true);
            throw e;
        }
    }


}

export const UserGroupEV1 = new UserGroupEntityV1()
