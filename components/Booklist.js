import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../context';
import BooksDetails from './BooksDetails';
const Boolist = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serach, setSearch] = useState('React native');
  const { favData, setFavData } = useContext(GlobalContext);
  const [modal, setModal] = useState(null);
  const scrollRef = useRef();
  const handlefav = async (res) => {
    setFavData((prev) => [...prev, res]);
    console.log(res);
    // times pro
  };

  const getItem = async () => {
    const data = await AsyncStorage.getItem('data');
    const jdata = await JSON.parse(data);
    // console.log(jdata.length, 'resiiiii');
    setFavData(jdata);
  };
  useEffect(() => {
    getItem();
  }, []);

  const setAsyncData = async () =>
    await AsyncStorage.setItem('data', JSON.stringify(favData));
  const isInFavourites = (book) => {
    return favData.some((fav) => fav.id === book.id);
  };

  const removeItem = (index) => {
    setFavData((prevData) => {
      const newData = [...prevData];
      return newData.filter((res) => res.id !== index);
    });
  };

  useEffect(() => {
    setAsyncData();
  }, [favData]);

  const getStates = async () => {
    setLoading(true);
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${serach}&maxResults=40&startIndex=${
          40 * page
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        setBooks(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(`Error`, err.response.data.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      getStates();
    }, 1000);
    if (serach === '') {
      setSearch('react native');
    }
    return () => clearTimeout(timerId);
  }, [page, serach]);

  return (
    <>
      <ScrollView style={styles.container} ref={scrollRef}>
        <Text style={styles.heading}>Search for Books</Text>
        <View style={styles.serach}>
          <FontAwesome
            name='search'
            size={18}
            color='#C4B4A0'
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholder='Search'
            style={{ width: '100%', height: 30, fontSize: 18, color: '#FFF' }}
            placeholderTextColor={'#C4B4A0'}
          />
        </View>
        {loading && (
          <ActivityIndicator
            size={30}
            color={'#FFF'}
            style={{ flex: 1, marginVertical: 5 }}
          />
        )}
        <View style={styles.listContainer}>
          {books.map((res, i) => {
            return (
              <>
                <TouchableOpacity
                  key={i}
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
                    onPress={() => {
                      !isInFavourites(res)
                        ? handlefav(res)
                        : removeItem(res.id);
                    }}
                    style={{ paddingLeft: 10, paddingBottom: 10 }}
                  >
                    {!isInFavourites(res) ? (
                      <FontAwesome5 name='heart' size={24} color={'#FFF'} />
                    ) : (
                      <FontAwesome name='heart' size={24} color='red' />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.title} numberOfLines={1}>
                    {res.volumeInfo?.title}
                  </Text>
                  <Text style={styles.author} numberOfLines={1}>
                    {res.volumeInfo.authors}
                  </Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
        <View style={styles.pagination}>
          {books.length > 0 &&
            [1, 2, 3, 4, 5].map((res) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                    setPage(res);
                  }}
                  style={{ marginHorizontal: 30 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#FFF',
                      backgroundColor: page !== res ? '#1A1A1A' : '#FFF',
                      color: page !== res ? '#FFF' : 'black',
                      padding: 10,
                    }}
                  >
                    {res}
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
    flex: 1,
    backgroundColor: '#101010',
  },
  heading: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginHorizontal: 28,
    marginTop: 10,
  },
  serach: {
    width: '90%',
    padding: 10,
    color: '#FFF',
    marginHorizontal: 'auto',
    marginTop: 35,
    height: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    flexDirection: 'row',
    //   gap: 20,
    alignItems: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -30,
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
  title: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -30,
    fontSize: 18,
    width: '100%',
  },
  author: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -50,
  },
  pagination: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'space-evenly',
    justifyContent: 'space-between',
    marginVertical: 80,
  },
});

export default Boolist;
