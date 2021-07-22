import * as Constant from './base.config'

export const STATUS_MSG = {
    "ERROR": {
        BELIEVING: {
            "E400": {
                "INVALID_EMAIL": {
                    "statusCode": 400,
                    "httpCode": 400,
                    "type": "INVALID_EMAIL"
                },
                "INVALID_PASSWORD": {
                    "statusCode": 400,
                    "httpCode": 400,
                    "type": "INVALID_PASSWORD"
                }
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
            "E409": {
                "USER_NOT_FOUND": {
                    "statusCode": 409,
                    "httpCode": 409,
                    "type": "USER_NOT_FOUND"
                }
            },
            "E410": {
                "FORCE_UPDATE": {
                    "statusCode": 410,
                    "httpCode": 410,
                    "type": "FORCE_UPDATE"
                }
            },
            "E422": {
                "INVALID_COUNTRY_CODE": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_COUNTRY_CODE"
                },
                "INVALID_PHONE_NO": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_PHONE_NO"
                },
                "INVALID_EMAIL": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_EMAIL"
                },
                "INVALID_OTP_INFO": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_OTP_INFO"
                },
                "INVALID_SOCIAL_INFO": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_SOCIAL_INFO"
                },
                "INVALID_USERNAME": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_USERNAME"
                },
                "INVALID_PASSWORD": {
                    "statusCode": 422,
                    "httpCode": 422,
                    "type": "INVALID_PASSWORD"
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
        BELIEVING: {
            "S200": {
                "OTP_SENT": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "OTP_SENT"
                },
                "OTP_VERIFIED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "OTP_VERIFIED"
                },
                "PHONE_VERIFIED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "PHONE_VERIFIED"
                },
                "FORGET_PASSWORD": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "FORGET_PASSWORD"
                },
                "UPDATED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "UPDATED"
                },
                "DELETED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "DELETED"
                },
                "BLOCKED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "BLOCKED"
                },
                "SOCIAL_LOGIN": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "SOCIAL_LOGIN"
                },
                "LOGIN": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "LOGIN"
                },
                "LOGOUT": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "LOGOUT"
                },
                "DEFAULT_SUCCESS": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "DEFAULT_SUCCESS"
                },
                "ACCOUNT_DELETED": {
                    "statusCode": 200,
                    "httpCode": 200,
                    "type": "ACCOUNT_DELETED"
                }
            },
            "S201": {
                "CREATED": {
                    "statusCode": 201,
                    "httpCode": 201,
                    "type": "CREATED"
                }
            },
            "S215": {
                "PROCEED_WITH_PHONE_NO": {
                    "statusCode": 215,
                    "httpCode": 200,
                    "type": "PROCEED_WITH_PHONE_NO"
                },
            },
            "S216": {
                "USER_EMAIL_ALREADY_EXIST": {
                    "statusCode": 216,
                    "httpCode": 200,
                    "type": "USER_EMAIL_ALREADY_EXIST"
                }
            }
        }
    },
    FRONTEND_ERROR: {
    }
};

export const CONF = {
    GENERAL: {
        OTP_EXPIRE_TIME: (10 * 60 * 1000), //millisecond
    }
}

export const MESSAGE_CONSTANT = {
    STATUS_MSG: {}
}



