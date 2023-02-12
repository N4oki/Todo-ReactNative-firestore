import React from 'react';
import {userThemeProps} from './UserThemePicker';
import {View, Text, Pressable} from 'react-native';

const Icons = ({
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
          <Pressable
            key={`${data.item}${index}`}
            onPress={() => {
              if (data.isChecked) return;
              setSelectedItem(data.item, 'icon');
            }}>
            {({pressed}) => (
              <Text
                style={[
                  {
                    transform: [{scale: pressed ? 0.96 : 1}],
                  },
                  {
                    fontSize: 30,
                    width: dimension,
                    height: dimension,
                    lineHeight: 40,
                    textAlign: 'center',
                  },
                ]}>
                {data.item}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default Icons;
