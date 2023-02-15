import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import UserThemePicker from '../components/sidebar/UserThemePicker';
import ProgressCircle from '../components/sidebar/ProgressCircle';

const SideBar = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#D0D4DA',
      }}>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 8,
          display: 'flex',
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
        <Text style={{fontSize: 12}}>Pick Your Color and Icon</Text>

        <UserThemePicker />
      </View>
    </SafeAreaView>
  );
};

export default SideBar;
