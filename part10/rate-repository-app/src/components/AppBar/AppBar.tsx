import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../DesignSystem/theme';
import AppBarItem from './AppBarItem';
import { Link } from 'react-router-native';

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
  return (
    <View style={styles.container}>
      <AppBarItem>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </AppBarItem>
      <AppBarItem>
        <Link to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </AppBarItem>
    </View>
  );
};

export default AppBar;