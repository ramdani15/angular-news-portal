export enum ROLES {
    ADMIN = 'admin',
    USER = 'user'
}

export enum REACTION {
    LIKE = 'like',
    DISLIKE = 'dislike'
}

export interface Author {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: ROLES;
}

export interface Pagination {
    total: number;
    totalPage: number;
    page: number;
    sort: number;
    sortBy: string;
    items: number;
    limit: number;
}