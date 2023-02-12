import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import CheckBox from '../taskCard/CheckBox';
import {userThemeProps} from './UserThemePicker';

const Colors = ({
  itemArray,
  dimension,
  setSelectedItem,
  gap,
}: userThemeProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: gap,
        marginBottom: 8,
      }}>
      {itemArray.map((data, index) => {
        return (
          <TouchableOpacity
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
    </View>
  );
};

export default Colors;
