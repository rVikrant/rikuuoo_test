
class EnvConfig {
    constructor() { }

    public SERVER = {
        BRAND: process.env.BRAND
    }

    public DATABASE = Object.freeze({
        APP: {
            RIKOOUU: 'RIKOOUU'
        },

        VERSION: {
            V1: "v1"
        },

        LANGUAGE: {
            EN: 'En'
        },

        TYPE: {
            API_CHANNEL: {
                RIKOOUU_TEST: "rikoouutest"
            },

            CONFIG: {
                GENERAL: "general",
                LOGGING: "logging",
                STATUS_MSG: "status_message"
            },

            TOKEN: {
                OWNER_AUTH: "OWNER_AUTH",
                GUEST_AUTH: "GUEST_AUTH",
                USER_AUTH: "USER_AUTH",
                REFRESH_AUTH: "REFRESH_AUTH"
            },

            DEVICE: {
                IOS: 'IOS',
                ANDROID: 'ANDROID',
                WEB: 'WEB'
            },

            STATUS: {
                INACTIVE: 0,
                ACTIVE: 1
            },

            PAGINATION: {

            }
        }
    })
}

export const ENV_CONFIG = new EnvConfig()