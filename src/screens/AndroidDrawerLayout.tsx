import {DrawerLayoutAndroid, SafeAreaView, Pressable} from 'react-native';
import React, {useRef} from 'react';
import MainScreen from './MainScreen';
import CustomIcon from '../utils/CustomIcon';
import SideBar from './SideBar';

const AndroidDrawerLayout = ({drawerWidth}: {drawerWidth: number}) => {
  const androidDrawerRef = useRef<DrawerLayoutAndroid>(null);
  return (
    <DrawerLayoutAndroid
      ref={androidDrawerRef}
      drawerWidth={drawerWidth}
      keyboardDismissMode="on-drag"
      renderNavigationView={SideBar}>
      <MainScreen />
      <SafeAreaView style={{position: 'absolute'}}>
        <Pressable
          style={{padding: 10}}
          onPress={() => androidDrawerRef.current?.openDrawer()}>
          <CustomIcon name="menu" size={30} dir="Feather" />
        </Pressable>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

export default AndroidDrawerLayout;
