import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client';
import AuthStorage from './authStorage';

const apolloUri = Constants.expoConfig?.extra?.apolloUri as string;
const httpLink = createHttpLink({
  uri: apolloUri,
});

const createApolloClient = (authStorage: AuthStorage): ApolloClient<unknown> => {
  const authLink = setContext(async (_request, { headers }: { headers?: Record<string, string> }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const requestHeaders = {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
      
      globalThis.console.log('Apollo Client Headers:', requestHeaders);
      
      return {
        headers: requestHeaders,
      };
    } catch (e) {
      globalThis.console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
