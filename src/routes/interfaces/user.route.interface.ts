declare namespace IUserRequestV1 {
    interface IFetchUsers {
        groups?: IUserGroups;
        perPage: number;
        pageNumber: number;
    }

    interface IUserGroups {
        fan?: object | string,
        admin?: object | string,
        creator?: object | string,
        superAdmin?: object | string,
    }
}