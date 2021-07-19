"use strict";

// dependencies
// import {imageSize} from 'image-size';
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));

export let isJsonString = function (str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

export let sendError = function (error, language: string = "En") {
    let customError: IHelper.IResponseObj = Object.assign({}, {
        "statusCode": 400,
        "httpCode": 400,
        "type": "DEFAULT_ERROR"
    })
    let customeMessage
    if (error && error.code && error.details) {
        if (isJsonString(error.details)) {
            customError.data = JSON.parse(error.details)
        }
        error.code = error.code + ""
    }
    else if (typeof error == 'object') {
        if (error.name === 'ValidationError') {
            customError.statusCode = 422;
            customError.httpCode = 422;
            customError.type = "VALIDATION_ERROR";
            if (error.hasOwnProperty('type'))
                customError['type'] = error.type
            if (error.hasOwnProperty('message'))
                customError['message'] = error.message
        }
        else {
            if (error.hasOwnProperty('payload'))
                error = error.payload
            if (error.hasOwnProperty('statusCode'))
                customError['statusCode'] = error.statusCode
            else
                customError['statusCode'] = 500;
            if (error.hasOwnProperty('httpCode'))
                customError['httpCode'] = error.httpCode
            else
                customError['httpCode'] = 500;
            if (error.hasOwnProperty('type'))
                customError['type'] = error.type
            else
                customError['type'] = "IMP_ERROR";
            if (error.hasOwnProperty('identifier'))
                customError['identifier'] = error.identifier
        }
    }
    else {
        customError.statusCode = 500;
        customError.httpCode = 500;
        customError.type = "IMP_ERROR";
    }
    return {
        statusCode: customError.statusCode,
        httpCode: customError.httpCode,
        // payload: statusMsgI18(customError, language, customeMessage),
        headers: {}
    }
}

// export let statusMsgI18 = function (statusObj: IHelper.IResponseObj, language: string, customeMessage?: string) {
//     let returnStatusObj: IHelper.IResponseObj = Object.assign({}, statusObj)
//     language = "En";
//     if (Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type]) {
//         returnStatusObj.message = Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type][language]
//         returnStatusObj.attributes = Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].attributes
//         returnStatusObj.heading = Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].heading
//         returnStatusObj.note = Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].note
//         if (statusObj.hasOwnProperty('identifier')) {
//             if (statusObj.identifier && statusObj.identifier.length > 0) {
//                 returnStatusObj.identifier = statusObj.identifier
//                 statusObj.identifier.forEach(obj => {
//                     if (obj.typeof == "date")
//                         obj.value = moment(obj.value).format("h:mm A")
//                     returnStatusObj.message = returnStatusObj.message.replace(obj.name, obj.value)
//                     returnStatusObj.note = {
//                         En: (returnStatusObj.note.En && returnStatusObj.note.En != "") ? returnStatusObj.note.En.replace(obj.name, obj.value) : "",
//                         Ar: (returnStatusObj.note.Ar && returnStatusObj.note.Ar != "") ? returnStatusObj.note.Ar.replace(obj.name, obj.value) : ""
//                     }
//                 })
//             } else
//                 returnStatusObj.identifier = []
//         } else {
//             if (Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].identifier && Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].identifier.length > 0) {
//                 Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND][returnStatusObj.type].identifier.forEach(obj => {
//                     if (obj.typeof == "date")
//                         obj.value = moment(obj.value).format("h:mm A")
//                     returnStatusObj.message = returnStatusObj.message.replace(obj.name, obj.value)
//                     returnStatusObj.note = {
//                         En: (returnStatusObj.note.En && returnStatusObj.note.En != "") ? returnStatusObj.note.En.replace(obj.name, obj.value) : "",
//                         Ar: (returnStatusObj.note.Ar && returnStatusObj.note.Ar != "") ? returnStatusObj.note.Ar.replace(obj.name, obj.value) : ""
//                     }
//                 })
//             } else
//                 returnStatusObj.identifier = []
//         }
//     } else {
//         returnStatusObj.message = customeMessage ? customeMessage : Constant.MESSAGE_CONSTANT.STATUS_MSG[Constant.ENV_CONFIG.SERVER.BRAND].DEFAULT_ERROR.En;
//         returnStatusObj.attributes = []
//         returnStatusObj.heading = {}
//         returnStatusObj.note = {}
//         returnStatusObj.identifier = []
//     }
//     return returnStatusObj
// }

export let sendSuccess = function (statusObj, language, data) {
    console.log(__filename, "data", JSON.stringify(data), true)
    let customSuccess: IHelper.IResponseObj = Object.assign({}, statusObj)
    if (data)
        customSuccess.data = data
    else
        customSuccess.data = null
    return customSuccess;
}

// function to get image dimensions
function sizeOfImage(path) {
    return new Promise((resolve, reject) => {
        console.log("typeof", typeof path);
        sizeOf(path, function (err, dimen) {
            console.log("+++++++sizeOfImage+++++++++++++dimen",dimen);
            if(err) reject(err);
            else resolve(dimen);
        });
    })
};

// function to create image thumbnail
export let createThumbnailImage = function (originalPath, thumbnailPath) {

    return new Promise(async (resolve, reject) => {
        let dimensions: any = await sizeOfImage(originalPath);
        const ratio = dimensions.width / dimensions.height;
        let gm = require('gm').subClass({imageMagick: true});
        gm(originalPath)
        .resize(dimensions.width * ratio * .15, dimensions.height * ratio * .15, "!")  // "!" ignore aspect ratio
        .autoOrient()
        .write(thumbnailPath, function (err, data) {
          if (err) reject(err);
          else resolve(0);
        })
    })
};