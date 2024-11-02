import { ROLES } from "../../shared/types";

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    roles: ROLES[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginReponseData {
    token: string;
    user: UserResponse;
}

export interface LoginReponse {
    status: boolean;
    message: string;
    data: LoginReponseData;
}

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
}

export interface SignUpResponse {
    status: boolean;
    message: string;
    data: UserResponse;
}

export interface LogoutResponse {
    status: boolean;
    message: string;
}