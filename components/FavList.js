import { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../context';
import BooksDetails from './BooksDetails';

const FavList = () => {
  const { favData, setFavData } = useContext(GlobalContext);
  const [modal, setModal] = useState(null);

  const getItem = async () => {
    const data = await AsyncStorage.getItem('data');
    const jdata = await JSON.parse(data);
    setFavData(jdata);
  };
  const removeItem = (index) => {
    setFavData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  useEffect(() => {
    getItem();
  }, []);
  const setAsyncData = async () =>
    await AsyncStorage.setItem('data', JSON.stringify(favData));
  useEffect(() => {
    setAsyncData();
  }, [favData]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.fav}>Favourite Books</Text>

        <View style={styles.listContainer}>
          {favData.length > 0 &&
            favData.map((res, i) => {
              return (
                <TouchableOpacity
                  testID='modal'
                  onPress={() => setModal(res)}
                  style={styles.listItem}
                >
                  <Image
                    source={{
                      uri: res.volumeInfo.imageLinks?.thumbnail,
                    }}
                    resizeMode='cover'
                    style={styles.image}
                  />
                  <TouchableOpacity
                    onPress={() => removeItem(i)}
                    style={{ paddingLeft: 10, paddingBottom: 10 }}
                  >
                    <FontAwesome name='heart' size={24} color='red' />
                  </TouchableOpacity>
                  <Text style={styles.title} numberOfLines={1}>
                    {res.volumeInfo?.title}
                  </Text>
                  <Text style={styles.authors} numberOfLines={1}>
                    {res.volumeInfo.authors}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <BooksDetails modal={modal} setModal={setModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101010',
  },
  fav: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginHorizontal: 28,
    marginTop: 10,
    height: 35,
  },
  title: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -30,
    fontSize: 18,
    width: '100%',
  },
  authors: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -50,
  },
  listContainer: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginBottom: 100,
    //   height: windowHeight,
  },
  listItem: {
    height: 220,
    width: '40%',
    backgroundColor: '#1A1A1A',
    marginTop: 70,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  image: {
    height: 160,
    width: '75%',
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default FavList;
