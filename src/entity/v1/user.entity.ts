'use strict';
import { BaseEntity } from '../base.entity'
import * as Constant from '../../config'
import { consolelog, bCryptData, compareCryptData } from '../../utils/helper';

export class UserEntityV1 extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.USER)
    }

    async fetchUsers(payload: {
        pageNumber: number,
        perPage: number
    }) {
        try {
            consolelog(__filename, "fetchUsers fn" , "", true);

            let criteria = { status: Constant.ENV_CONFIG.DATABASE.TYPE.STATUS.ACTIVE};

            let pipe = [{
                $match: criteria
            }, {
                $facet: {
                    count: [{$count: "count"}],
                    data: [{
                        $skip: Number((payload.pageNumber - 1) * payload.perPage)                          // as skip docs will be 1 less page at the current page no
                    },{
                        $limit: Number(payload.perPage)
                    },{
                        $lookup: {
                            from: Constant.SET_NAME.GROUP,
                            localField: "userGroupId",
                            foreignField: "_id",
                            as: "group"
                        }
                    },{
                        $addFields: {
                            group: {$ifNull: [{$arrayElemAt: ["$group.name", 0]}, ""]}
                        }
                    }]
                }
            }, {
                $project: {
                    data: 1,
                    totalCount: {$arrayElemAt: ["$count.count", 0]},
                }
            }];

            return (await this.aggregateEntityMdb(pipe))[0];
        } catch(e) {
            consolelog(__filename, "fetch users entity error -------", e, true);
            throw e;
        }
    }

   
}

export const UserEV1 = new UserEntityV1()
