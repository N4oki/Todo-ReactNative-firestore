import React, {useRef} from 'react';
import MainScreen from './src/screens/MainScreen';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import SideBar from './src/screens/SideBar';
import {Dimensions, Pressable, SafeAreaView, View} from 'react-native';
import {AppWrapper} from './src/utils/context';
import CustomIcon from './src/utils/CustomIcon';

const WIDTH = Dimensions.get('window').width;

export default function App() {
  const drawerRef = useRef<DrawerLayout>(null);
  return (
    <AppWrapper>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={WIDTH * 0.7}
        edgeWidth={WIDTH * 0.3}
        drawerType="slide"
        renderNavigationView={SideBar}>
        <MainScreen />
        <SafeAreaView style={{position: 'absolute'}}>
          <Pressable
            style={{padding: 10}}
            onPress={() => drawerRef.current?.openDrawer()}>
            <CustomIcon name="menu" size={30} dir="Feather" />
          </Pressable>
        </SafeAreaView>
      </DrawerLayout>
    </AppWrapper>
  );
}
