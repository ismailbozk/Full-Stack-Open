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