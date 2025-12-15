import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../DesignSystem/theme';
import AppBarItem from './AppBarItem';

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
  }
});


const AppBar = () => {
  return (
    <View style={styles.container}>{
      <AppBarItem>
        <Text style={styles.text}>Repositories</Text>
      </AppBarItem>
    }</View>
  );
};

export default AppBar;