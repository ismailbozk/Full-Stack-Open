import { StyleSheet, View } from 'react-native';
import RepositoryList from './Repository/RepositoryList';
import AppBar from './AppBar/AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn/SignIn';
import { RepositoryDetail } from './Repository/RepositoryDetail';

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:repositoryId" element={<RepositoryDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
}

export default Main;