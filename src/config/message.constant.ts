import * as Constant from './base.config'

export const STATUS_MSG = {
    "ERROR": {
        RIKUUOO: {
            "E400": {
            },
            "E401": {
                "UNAUTHORIZED": {
                    "statusCode": 401,
                    "httpCode": 401,
                    "type": "UNAUTHORIZED"
                },
                "ACCESS_TOKEN_EXPIRED": {
                    "statusCode": 401,
                    "httpCode": 401,
                    "type": "ACCESS_TOKEN_EXPIRED"
                }
            },
            "E404": {
                "RESOURCE_NOT_FOUND": {
                    "statusCode": 404,
                    "httpCode": 404,
                    "type": "RESOURCE_NOT_FOUND"
                }
            },
            "E422": {
                "INVALID_PER_PAGE_LIMIT": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_PER_PAGE_LIMIT"
                },
                "INVALID_PAGE_NO": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_PAGE_NO"
                },
                "DEFAULT_VALIDATION_ERROR": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "DEFAULT_VALIDATION_ERROR"
                },
                "VALIDATION_ERROR": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "VALIDATION_ERROR"
                },
                "CUSTOM_VALIDATION_ERROR": (keys) => {
                    return {
                        "statusCode": 422,
                        "httpCode": 422,
                        "type": "CUSTOM_VALIDATION_ERROR",
                        "identifier": [
                            {
                                name: "${keys}",
                                value: keys,
                                typeof: "string"
                            }
                        ]
                    }
                }
            },
            "E500": {
                "DB_ERROR": {
                    "statusCode": 500,
                    "httpCode": 500,
                    "type": "DB_ERROR"
                },
                "IMP_ERROR": {
                    "statusCode": 500,
                    "httpCode": 500,
                    "type": "IMP_ERROR"
                },
                "INVALID_TOKEN_TYPE": {
                    "statusCode": 500,
                    "httpCode": 500,
                    "type": "INVALID_TOKEN_TYPE"
                }
            },
            "E501": {
                "TOKENIZATION_ERROR": {
                    "statusCode": 501,
                    "httpCode": 501,
                    "type": "TOKENIZATION_ERROR"
                }
            }
        }
    },
    "SUCCESS": {
        RIKUUOO: {
            "S200": {
                "DEFAULT_SUCCESS": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "DEFAULT_SUCCESS"
                }
            }
        }
    }
};

export const MESSAGE_CONSTANT = {
    STATUS_MSG: {
        RIKUUOO: {
            IMP_ERROR: {
                En: "Implementation Error",
                heading: {
                    En: ""
                },
                note: {
                    En: "",
                },
                attributes: [],
                identifier: []
            },
        }
    }
}



