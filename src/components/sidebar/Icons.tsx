import React from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {userThemeProps} from './UserThemePicker';

const Icons = ({itemArray, dimension, setSelectedItem}: userThemeProps) => {
  return (
    <HStack flexWrap="wrap" space={2}>
      {itemArray.map((data, index) => {
        return (
          <Pressable
            key={`${data.item}${index}`}
            onPress={() => {
              if (data.isChecked) return;
              setSelectedItem(data.item, 'icon');
            }}>
            {({isPressed}) => {
              return (
                <Text
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  fontSize={30}
                  width={dimension}
                  height={dimension}
                  lineHeight={40}
                  textAlign="center">
                  {data.item}
                </Text>
              );
            }}
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default Icons;
