import { connect, set, connection as db, Types } from 'mongoose';
const displayColors = true;

globalThis["ObjectId"] = Types.ObjectId;

export class MongoClass {
    private mongoUrl = process.env.mongoUrl;

    constructor() { }

    async init() {
        let self = this;

        if (!(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging'))
            set('debug', true);

        set('useFindAndModify', false)
        set('useUnifiedTopology', true)

        db.on('error', err => { console.error('%s', err) })
            .on('close', (error) => {
                console.log(__filename, 'Database connection closed.', error, false)

            })

        connect(self.mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, function (error) {
            if (error) {
                return Promise.reject(error)
            }
            console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to mongo`)
        })
        return {}
    }
}

export const Mongo = new MongoClass();