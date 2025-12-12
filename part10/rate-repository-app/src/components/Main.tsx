import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { data } from '../service/service';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList repositories={data} />
    </View>
  );
}

export default Main;