import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import AuthStorage from './authStorage';
import { relayStylePagination } from '@apollo/client/utilities';

const apolloUri = Constants.expoConfig?.extra?.apolloUri as string;
const httpLink = createHttpLink({
  uri: apolloUri,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage: AuthStorage): ApolloClient<unknown> => {
  const authLink = setContext(async (_request, { headers }: { headers?: Record<string, string> }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      const requestHeaders = {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
            
      return {
        headers: requestHeaders,
      };
    } catch (e) {
      globalThis.console.error(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
};

export default createApolloClient;
