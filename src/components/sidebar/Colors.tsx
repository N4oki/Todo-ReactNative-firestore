import {TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import CheckBox from '../taskCard/CheckBox';
import {userThemeProps} from './UserThemePicker';

const Colors = ({itemArray, dimension, setSelectedItem}: userThemeProps) => {
  return (
    <HStack flexWrap="wrap" space="2">
      {itemArray.map((data, index) => {
        return (
          <TouchableOpacity
            style={{marginVertical: 2}}
            key={`${data.item}${index}`}
            onPress={() => {
              if (data.isChecked) return;
              setSelectedItem(data.item, 'color');
            }}>
            <CheckBox
              boxFillColor={data.item}
              isChecked={data.isChecked}
              strokeColor="white"
              side={true}
              width={dimension}
              height={dimension}
              margin={0}
            />
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default Colors;
