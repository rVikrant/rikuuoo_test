declare namespace IHelper {
    
    interface IResponseObj extends IMessageContantObj {
        statusCode: number,
        httpCode: number,
        type: string,
        message?: string,
        data?: any;
        actionHint?: string,
        useNoonPayMessage?: boolean,
        name?: string
    }

    interface IMessageContantObj {
        Ar?: string,
        En?: string,
        heading?: IErrorHeading,
        note?: IErrorHeading
        attributes?: IHttpAttributes[],
        identifier?: IIdentifier[],
    }

    interface IErrorHeading {
        Ar?: string,
        En?: string,
    }
    interface IHttpAttributes {
        type: string,
        Ar: string,
        En: string,
        action: string,
        default: boolean
    }

    interface IIdentifier {
        name: string
        value: any,
        typeof: string
    }

}