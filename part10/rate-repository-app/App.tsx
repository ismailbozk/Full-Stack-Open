import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();


const App = () => {
  globalThis.console.log("App Constants: ", Constants.expoConfig);
  return (
    <NativeRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
      <StatusBar style="auto" />
    </NativeRouter >
  );
};

export default App;