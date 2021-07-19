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
    }

}