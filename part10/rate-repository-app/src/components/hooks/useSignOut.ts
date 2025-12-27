import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

export const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            await authStorage.removeAccessToken();
            await apolloClient.resetStore();
            navigate('/signin');
        } catch (error) {
            globalThis.console.error("Sign out failed:", error);
            throw error;
        }
    };

    return signOut;
};
