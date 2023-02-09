import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {getColorScheme} from './tools';
type dirType = 'FontAwesome' | 'Feather' | 'AntDesign';

interface iconProps {
  name: string;
  size?: number;
  color?: string;
  dir: dirType;
}

const CustomIcon = (iconProps: iconProps) => {
  const {name, size, color, dir} = iconProps;
  const {textColor} = getColorScheme().colors;

  switch (dir) {
    case 'FontAwesome':
      return (
        <IconFontAwesome
          name={name}
          size={size || 18}
          color={color || textColor}
        />
      );
    case 'Feather':
      return (
        <IconFeather name={name} size={size || 18} color={color || textColor} />
      );
    case 'AntDesign':
      return (
        <IconAntDesign
          name={name}
          size={size || 18}
          color={color || textColor}
        />
      );
  }
};

export default CustomIcon;
