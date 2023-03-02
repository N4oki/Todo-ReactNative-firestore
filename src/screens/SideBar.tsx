import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import UserThemePicker from '../components/sidebar/UserThemePicker';
import ProgressCircle from '../components/sidebar/ProgressCircle';
import {updater} from '../utils/firestoreUpdater';

const SideBar = () => {
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
        <Button
          title="Reset task"
          onPress={() => updater({key: 'deleteAll'})}
        />
      </View>
    </SafeAreaView>
  );
};

export default SideBar;
