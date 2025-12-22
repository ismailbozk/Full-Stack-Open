import { useMutation, MutationResult } from '@apollo/client/react';
import { useApolloClient } from '@apollo/client/react';
import { FetchResult } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutations';
import { SignInCredentials, SignInResult } from '../../types/User';
import AuthStorage from '../../utils/authStorage';
import useAuthStorage from './useAuthStorage';

type UseSignInReturn = [
    (_credentials: SignInCredentials) => Promise<FetchResult<SignInResult>>,
    MutationResult<SignInResult>
];

export const useSignIn = (): UseSignInReturn => {
    const authStorageInstance: AuthStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    
    const [mutate, result] = useMutation<SignInResult>(SIGN_IN, {
        onError: (error) => {
            globalThis.console.error("Sign in failed: ", error.message);
        },
        onCompleted: async (data) => {
            globalThis.console.log("Sign in succeeded, access token: ", data.authenticate.accessToken);
            if (data?.authenticate.accessToken) {
                try {
                    await authStorageInstance.setAccessToken(data.authenticate.accessToken);
                    globalThis.console.log("Saved access token to storage");
                    apolloClient.resetStore();
                    globalThis.console.log("reset apollo client store");
                } catch (e) {
                    globalThis.console.error("Failed to store access token: ", e);
                }
            }
        }
    });

    const signIn = async ({ username, password }: SignInCredentials) => {
        return mutate({ variables: { username, password } });
    };

    return [signIn, result];
};