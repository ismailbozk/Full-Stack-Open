export interface SignInCredentials {
    username: string;
    password: string;
}

export interface SignInResult {
    authenticate: AuthPayload
}

export interface AuthPayload {
    accessToken: string;
}

export interface User {
    id: string;
    username: string;
}

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface CreateUserResponseData {
    id: string;
    username: string;
    createdAt: string;
}

export interface CreateUserResponse {
    createUser: CreateUserResponseData;
}