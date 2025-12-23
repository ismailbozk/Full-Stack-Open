import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../DesignSystem/theme';
import AppBarItem from './AppBarItem';
import { Link } from 'react-router-native';
import { useUserInfo } from '../hooks/useUserInfo';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';
import AuthStorage from '../../utils/authStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    height: 100,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.header,
    padding: theme.spacing.medium,
  }
});

const AppBar = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    globalThis.console.log("Signing out...");
    await authStorage.removeAccessToken();
    globalThis.console.log("Access token removed");
    await apolloClient.resetStore();
    globalThis.console.log("Apollo client store reset");
    navigate('/signin');
    globalThis.console.log("Navigated to sign-in page");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <AppBarItem>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </AppBarItem>
        {
          userInfo === null
            ?
            <AppBarItem>
              <Link to="/signin">
                <Text style={styles.text}>Sign In</Text>
              </Link>
            </AppBarItem>
            :
            <AppBarItem onPress={handleSignOut}>
              <Text style={styles.text}>Sign Out</Text>
            </AppBarItem>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;