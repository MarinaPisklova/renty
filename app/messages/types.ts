export interface Message {
    _id: string;
    read: boolean;
    email: string;
    phone: string;
    body: string;
    createdAt: Date;
    property: {
        name: string;
    };
    sender: {
        username: string;
    };
}
