export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Channel {
    id: number;
    name: string;
    owner_id: number;
}