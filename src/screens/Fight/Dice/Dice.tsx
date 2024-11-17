import React, {memo} from 'react';
import {Text, View} from 'react-native';

export const Dice = memo<DiceProps>(({damage}) => {
  return (
    <View
      style={{
        width: 40,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{fontSize: 16}}>{`${damage}`}</Text>
    </View>
  );
});

type DiceProps = {
  damage: number;
};
