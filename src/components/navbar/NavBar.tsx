import React from 'react';
import AnimatedProgressText from './AnimatedProgressText';
import {getColorScheme} from '../../utils/tools';
import {View, Text} from 'react-native';

const NavBar = () => {
  const {navbarBg, textColor} = getColorScheme().colors;

  return (
    <View
      style={{
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: navbarBg,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedProgressText />
        <Text style={{fontSize: 10, color: textColor}}>completed</Text>
      </View>
    </View>
  );
};

export default NavBar;
