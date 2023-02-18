import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import UserThemePicker from '../components/sidebar/UserThemePicker';
import ProgressCircle from '../components/sidebar/ProgressCircle';
import firestore from '@react-native-firebase/firestore';

const SideBar = () => {
  const deleteAll = async () => {
    const ref = firestore().collection('todos');

    ref.get().then(querySnapshot => {
      if (querySnapshot.docs.length === 0) return;
      Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#D0D4DA',
      }}>
      <View
        style={{
          display: 'flex',
          paddingLeft: 16,
          paddingRight: 8,
          paddingBottom: 10,
          gap: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 28}}>TODO</Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ProgressCircle size={150} strokeWidth={20} />
        </View>
        <UserThemePicker />
        <Button title="Reset task" onPress={() => deleteAll()} />
      </View>
    </SafeAreaView>
  );
};

export default SideBar;
