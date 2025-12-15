import { StyleSheet, View } from 'react-native';
import { data } from '../service/service';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar/AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList repositories={data} />
    </View>
  );
}

export default Main;