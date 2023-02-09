import React from 'react';
import {Box, Text, VStack} from 'native-base';
import AnimatedProgressText from './AnimatedProgressText';
import {getColorScheme} from '../../utils/tools';

const NavBar = () => {
  const {navbarBg, textColor} = getColorScheme().colors;

  return (
    <Box
      safeArea
      bgColor={navbarBg}
      width="100%"
      height="30%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      shadow={2}>
      <VStack display="flex" alignItems="center" justifyContent="center">
        <AnimatedProgressText />
        <Text style={{fontSize: 10, color: textColor}}>completed</Text>
      </VStack>
    </Box>
  );
};

export default NavBar;
