import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  if (!Constants.expoConfig?.extra?.apolloUri || typeof Constants.expoConfig?.extra?.apolloUri !== 'string') {
    throw new Error('APOLLO_URI is not defined in environment variables');
  }

  return new ApolloClient({
    uri: Constants.expoConfig?.extra?.apolloUri as string,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
