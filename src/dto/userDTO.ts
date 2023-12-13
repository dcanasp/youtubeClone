export interface IRegister {
    username: string;
    password: string;
    email: string;
    bio?: string;
    profilePicUrl?: string;
}

export interface ILogin{
    username: string;
    password: string;
}

export type JWTPayload = {
    payload: {
        username: string;
    };
};
