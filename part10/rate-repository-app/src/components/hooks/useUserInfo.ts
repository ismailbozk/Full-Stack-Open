import { useQuery } from '@apollo/client/react';
import { USER_INFO } from '../../graphql/queries';
import AuthStorage from '../../utils/authStorage';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

export interface UserInfo {
    id: string;
    username: string;
}

interface UseUserInfoResult {
    me: UserInfo | null;
}

export interface UseUserInfoReturn {
    userInfo: UserInfo | null;
    loading: boolean;
}

export const useUserInfo = (): UseUserInfoReturn => {
    const authStorageInstance: AuthStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const { data, loading } = useQuery<UseUserInfoResult>(USER_INFO,
        {
            fetchPolicy: 'cache-and-network',
            onError: (error) => {
                globalThis.console.error("Fetch repositories failed: ", error.message);
            },
            onCompleted: async () => {
                await authStorageInstance.removeAccessToken()
                await apolloClient.resetStore();
            }
        }
    );

    globalThis.console.log("User info data: ", data);

    return { userInfo: data?.me || null, loading };
};