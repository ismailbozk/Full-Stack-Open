import { useQuery } from '@apollo/client/react';
import { USER_INFO } from '../../graphql/queries';
import AuthStorage from '../../utils/authStorage';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react';
import { ReviewsWrapper } from '../../types/Review';
import { FetchResult } from '@apollo/client';

export interface UserInfo {
    id: string;
    username: string;
    reviews?: ReviewsWrapper;
}

interface UseUserInfoResult {
    me: UserInfo | null;
}

export interface UseUserInfoReturn {
    userInfo: UserInfo | null;
    loading: boolean;
    refetch: () => Promise<FetchResult<UseUserInfoResult>>;
}

export const useUserInfo = (withReviews: boolean = false): UseUserInfoReturn => {
    const authStorageInstance: AuthStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const { data, loading, refetch } = useQuery<UseUserInfoResult>(USER_INFO,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                withReviews: withReviews
            },
            onError: (error) => {
                globalThis.console.error("Fetch repositories failed: ", error.message);
            },
            onCompleted: async () => {
                if (data?.me === null) {
                    await authStorageInstance.removeAccessToken()
                    await apolloClient.resetStore();
                }
            }
        }
    );

    globalThis.console.log("User info data: ", data);

    return { userInfo: data?.me || null, loading, refetch};
};