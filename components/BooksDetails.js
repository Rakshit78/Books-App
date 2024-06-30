import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';

function BooksDetails({ modal, setModal }) {
  return (
    <>
      <Modal transparent visible={modal !== null} animationType='slide'>
        <BlurView style={{ flex: 1 }} intensity={20}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setModal(null)} style={styles.btn}>
              <AntDesign name='close' size={24} color='#FFF' />
            </TouchableOpacity>
            <View style={styles.container1}>
              <Image
                source={{
                  uri: modal?.volumeInfo?.imageLinks?.thumbnail,
                }}
                resizeMode='cover'
                style={styles.image}
              />
              <Text style={styles.title} numberOfLines={2}>
                {modal?.volumeInfo?.title}
              </Text>
              <Text style={styles.authors} numberOfLines={1}>
                {modal?.volumeInfo?.authors}
              </Text>
              <Text style={styles.publisher}>
                Published Date: {modal?.volumeInfo?.publishedDate}
              </Text>
              <Text style={styles.date}>
                Publisher:{' '}
                {modal?.volumeInfo?.publisher
                  ? modal?.volumeInfo?.publisher
                  : 'Not Available'}
              </Text>
            </View>
            <ScrollView style={styles.descriptionContainer}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.description}>
                {modal?.volumeInfo?.description}
              </Text>
            </ScrollView>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    marginTop: '35%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  btn: {
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: '#131313',
    borderRadius: 50,
    padding: 10,
  },
  container1: {
    height: 220,
    width: '96%',
    marginTop: 0,
    marginHorizontal: 10,
    // borderRadius: 15,
    // elevation: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: 'center',
  },
  image: {
    height: 190,
    width: '75%',
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    resizeMode: 'contain',
    //   borderRadius: 10,
  },
  title: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -30,
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
  },
  authors: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -58,
    fontSize: 18,
    fontWeight: '500',
  },
  publisher: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -90,
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    color: '#FFF',
    position: 'absolute',
    marginHorizontal: 'auto',
    bottom: -120,
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    marginHorizontal: 10,
    textAlign: 'start',
    marginBottom: 50,
  },
  descriptionContainer: {
    marginTop: 150,
    marginBottom: 10,
    backgroundColor: '#131313',
    padding: 10,
  },
  descTitle: {
    fontSize: 18,
    color: '#FFF',
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: '700',
  },
});

export default BooksDetails;
