import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import MyStack from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import GlobalContext from './context';
import { useState } from 'react';
export default function App() {
  const [favData, setFavData] = useState([]);
  return (
    <SafeAreaView
      style={[styles.container, { marginTop: Platform.OS === 'ios' ? 0 : 30 }]}
    >
      <GlobalContext.Provider value={{ favData, setFavData }}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </GlobalContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    // marginHorizontal: 20,
  },
});
