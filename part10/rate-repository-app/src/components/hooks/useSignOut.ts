import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

export const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();

    const signOut = async () => {
        try {
            globalThis.console.log("Signing out...");
            await authStorage.removeAccessToken();
            globalThis.console.log("Access token removed");
            await apolloClient.resetStore();
            globalThis.console.log("Apollo client store reset");
            navigate('/signin');
            globalThis.console.log("Navigated to sign-in page");
        } catch (error) {
            globalThis.console.error("Sign out failed:", error);
            throw error;
        }
    };

    return signOut;
};
