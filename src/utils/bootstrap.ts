"use strict";

// local dependencies
import { Mongo } from '../mongo';

export let bootstrap = async (server) => {
    try {
        await Mongo.init();

        return {};
    } catch(e) {
        throw e;
    }
} 
