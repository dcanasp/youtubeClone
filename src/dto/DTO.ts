export interface IRegister {
    username: string;
    password: string;
    email: string;
    bio?: string;
    profilePicUrl?: string;
}

export interface ILogin {
    username: string;
    password: string;
}

export type JWTPayload = {
    payload: {
        username: string;
        userId: number;
    };
};

export interface IVideo {
    title: IMultipartFormField;
    description?: IMultipartFormField;
    tags?: IMultipartFormField;
    processingStatus: IMultipartFormField;
    fileUrl?: IMultipartFormField;
    thumbnailUrl?: IMultipartFormField;
    content?: IFileField;
}



export interface IMultipartFormField {
    encoding: string;
    fieldname: string;
    fieldnameTruncated: boolean;
    value: string;
    valueTruncated: boolean;
    fields: {
        content:IFileField;
    }

}

export interface IBuffer {
    data: number[];
    type: 'Buffer';
}

export interface IFileField {
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    // _buf: IBuffer;
    _buf: number[];
    file: {
        _eventsCount: number;
        _readableState: {
            awaitDrainWriters: null | any;
            buffer: any;
            highWaterMark: number;
            length: number;
            pipes: any[];
        };
        bytesRead: number;
        truncated: boolean;

    };
}


