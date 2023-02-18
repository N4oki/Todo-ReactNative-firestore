import React from 'react';
import {useAppContext, userData} from '../../utils/context';
import {Dimensions, ScrollView, Text} from 'react-native';
import Colors from './Colors';
import Icons from './Icons';
const WIDTH = Dimensions.get('window').width;

export interface userThemeProps {
  itemArray: {
    item: string;
    isChecked: boolean;
  }[];
  dimension: number;
  setSelectedItem: (item: string, type: 'color' | 'icon') => void;
  gap: number;
}

const PADDING = 16 + 8;
const GAP = 8;
const SIDE_WIDTH = WIDTH * 0.7 - PADDING;
const WIDTH_HEIGHT = SIDE_WIDTH / 5 - GAP;

const UserThemePicker = () => {
  const {userData, setUserData} = useAppContext();

  const setSelectedItem = (item: string, type: 'color' | 'icon') => {
    if (type === 'icon') {
      setUserData((prev: userData): userData => {
        const newIcon = prev.icon.map(icon => {
          if (icon.item === item) {
            return {item: icon.item, isChecked: true};
          } else return {item: icon.item, isChecked: false};
        });

        return {color: prev.color, icon: newIcon};
      });
    }

    if (type === 'color') {
      setUserData((prev: userData): userData => {
        const newColor = prev.color.map(color => {
          if (color.item === item) {
            return {item: color.item, isChecked: true};
          } else return {item: color.item, isChecked: false};
        });

        return {color: newColor, icon: prev.icon};
      });
    }
  };

  return (
    <>
      <Text style={{fontSize: 12}}>Pick Your Color and Icon</Text>
      <ScrollView>
        <Colors
          itemArray={userData.color}
          dimension={WIDTH_HEIGHT}
          gap={GAP}
          setSelectedItem={setSelectedItem}
        />
        <Icons
          itemArray={userData.icon}
          dimension={WIDTH_HEIGHT}
          gap={GAP}
          setSelectedItem={setSelectedItem}
        />
      </ScrollView>
    </>
  );
};

export default UserThemePicker;
