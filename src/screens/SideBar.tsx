import React from 'react';
import {Box, Text, VStack} from 'native-base';
import UserThemePicker from '../components/sidebar/UserThemePicker';
import ProgressCircle from '../components/sidebar/ProgressCircle';

const SideBar = () => {
  return (
    <VStack flex={1} px={4} bgColor="#D0D4DA">
      <VStack safeArea space="md">
        <Text fontWeight="bold" fontSize="3xl">
          TODO
        </Text>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <ProgressCircle size={150} strokeWidth={20} />
        </Box>
        <Box>
          <Text fontSize={12} marginY={2}>
            Pick Your Color and Icon
          </Text>
          <UserThemePicker />
        </Box>
      </VStack>
    </VStack>
  );
};

export default SideBar;
