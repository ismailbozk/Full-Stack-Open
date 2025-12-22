import { useMutation, MutationResult } from '@apollo/client/react';
import { FetchResult } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutations';

interface SignInCredentials {
    username: string;
    password: string;
}

interface SignInResult {
    authenticate: AuthPayload
}

interface AuthPayload {
    accessToken: string;
}

type UseSignInReturn = [
    (_credentials: SignInCredentials) => Promise<FetchResult<SignInResult>>,
    MutationResult<SignInResult>
];

export const useSignIn = (): UseSignInReturn => {
    const [mutate, result] = useMutation<SignInResult>(SIGN_IN, {
        onError: (error) => {
            globalThis.console.error("Sign in failed: ", error.message);
        },
        onCompleted: (data) => {
            globalThis.console.log("Sign in succeeded, access token: ", data.authenticate.accessToken);
        }
    });

    const signIn = async ({ username, password }: SignInCredentials) => {
        return mutate({ variables: { username, password } });
    };

    return [signIn, result];
};