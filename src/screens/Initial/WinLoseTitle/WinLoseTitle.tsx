import React, {memo} from 'react';
import {Text} from 'react-native';

export const WinLoseTitle = memo<WinLoseTitleProps>(({value}) => {
  const resultTitle = value ? 'Win' : 'Lose';

  return <Text style={value ? {color: 'green'} : {color: 'red'}}>{resultTitle}</Text>;
});

type WinLoseTitleProps = {
  value: number;
};
