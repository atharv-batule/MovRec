import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
const Header = () => (
  <Appbar.Header style={styles.header}>
    <Appbar.Content
      title="Atharv"
      titleStyle={styles.headerTitle}
    />
    <Appbar.Action icon="magnify" onPress={() => {}} color="#fff" />
    <Appbar.Action icon="bell-outline" onPress={() => {}} color="#fff" />
  </Appbar.Header>
);
export default Header;
const styles = StyleSheet.create({
      header: {
    backgroundColor: '#0f0f0f',
    elevation: 0,
  },
  headerTitle: {
    color: '#E50914',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1,
  },
})
  
