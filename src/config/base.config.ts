
class EnvConfig {
    constructor() { }

    public SERVER

    public DATABASE = Object.freeze({
        APP: {
            BELIEVING: 'BELIEVING'
        },

        VERSION: {
            V1: "v1"
        },

        LANGUAGE: {
            EN: 'En'
        },

        TYPE: {
            API_CHANNEL: {
                BELIEVING_WEB_APP: "beleivingWebApp"
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

            SOCIAL_PLATFORM: {
                GOOGLE: "GOOGLE",
                FB: "FB",
                APPLE: "APPLE"
            },

            APP_VERSION: {
                FORCE: "FORCE",
                SKIP: "SKIP",
                NORMAL: "NORMAL"
            },

            ACTIVITY_LOG: {
                FAIL_Q: "FAIL_Q",
                REQUEST: "REQUEST"
            },

            ACTIVITY_LOG_ID_INFO: {
                USER_ID: "USER_ID",
                PHONE_NO: "PHONE_NO",
                EMAIL: "EMAIL",
                FEEDBACK_ID: "FEEDBACK_ID"
            },

            STATUS: {
                INACTIVE: 0,
                ACTIVE: 1
            },

            PAGINATION: {

            },

            NOTIFICATION: {
                SMS: "SMS",
                EMAIL: "EMAIL",
            },

            OTP_VIA: {
                EMAIL: "EMAIL",
                PHONE: "PHONE"
            }
        }
    })

    public NOTIFICATION_CODE = Object.freeze({
        SMS: {
            USER_OTP_VERIFICATION: 'USER_OTP_VERIFICATION',
        },
        EMAIL: {
            USER_OTP_VERIFICATION: 'USER_OTP_VERIFICATION'
        }
    })
}

export const ENV_CONFIG = new EnvConfig()