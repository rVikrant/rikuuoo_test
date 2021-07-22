import * as mongoose from "mongoose";
import * as Constant from '../config'
import * as Services from '../mongo/dao';
import { authService } from "../services/auth";
import { consolelog } from '../utils/helper';

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createOneEntityMdb(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.set, saveData)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity createOneEntityMdb', error, false)
            return Promise.reject(error)
        }
    }

    async getOneEntityMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option != undefined) {
                option['lean'] = true
            } else {
                option = { lean: true }
            }
            let data = await this.DAOManager.findOne(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity getOneEntityMdb', error, false)
            return Promise.reject(error)
        }
    }

    async getAllEntityMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option != undefined) {
                option['lean'] = true
            } else {
                option = { lean: true }
            }
            let data = await this.DAOManager.findAll(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity getOneEntityMdb', error, false)
            return Promise.reject(error)
        }
    }

    async getMultipleMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.getData(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity getMultipleMdb', error, false)
            return Promise.reject(error)
        }
    }

    async distinctMdb(path: string, criteria: Object, option?) {
        try {
            return await this.DAOManager.distinct(this.set, path, criteria)
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async updateOneEntityMdb(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.set, criteria, dataToUpdate, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity updateOneEntityMdb', error, false)
            return Promise.reject(error)
        }
    }

    public async aggregateEntityMdb(aggregateArray: any) {
        try {
            let data = await this.DAOManager.aggregateData(this.set, aggregateArray, {});
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity aggregateUsers', error, false)
            return Promise.reject(error)
        }
    }

    // public async bulkUpdate(payload) {
    //     try {
    //         let data = await this.DAOManager.bulkWrite(this.set, payload, 'updateOne');
    //         return data
    //     } catch (error) {
    //         consolelog(__filename, 'Base entity bulkUpdate', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // public async bulkUpdateEntityMdb() {
    //     try {
    //
    //     } catch (error) {
    //         consolelog(__filename, 'Base entity bulkUpdateEntityMdb', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    async replaceOneEntity(criteria: Object, replacement: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, upsert: true }
            let data = await this.DAOManager.findAndReplaceOne(this.set, criteria, replacement, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity replaceOneEntity', error, false)
            return Promise.reject(error)
        }
    }

    async aggregateMdb(pipeline, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.aggregateData(this.set, pipeline, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity aggregateMdb', error, false)
            return Promise.reject(error)
        }
    }

    async removeOneMdb(condition, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.findAndRemove(this.set, condition, option)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity removeOneMdb', error, false)
            return Promise.reject(error)
        }
    }

    async removeAllMdb(condition) {
        try {
            let data = await this.DAOManager.remove(this.set, condition)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity removeAllMdb', error, false)
            return Promise.reject(error)
        }
    }

    async countMdb(criteria: Object) {
        try {
            let data = await this.DAOManager.count(this.set, criteria)
            return data
        } catch (error) {
            consolelog(__filename, 'Base entity count', error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Create token from auth service
     */
     async createToken(dataToSend: any) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(__filename, "createToken", error, false)
            return Promise.reject(error)
        }
    }
}