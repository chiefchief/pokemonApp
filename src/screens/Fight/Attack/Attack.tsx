import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';
import {getTheDamage} from './helpers';

export const Attack = memo<AttackProps>(({onAttack, disabled}) => {
  const onPress = () => {
    const yourDamage = getTheDamage();
    const opponentDamage = getTheDamage();

    onAttack?.({yourDamage, opponentDamage});
  };
  return (
    <Pressable
      disabled={disabled}
      style={[
        {
          height: 40,
          backgroundColor: 'red',
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
          marginHorizontal: 16,
        },
        disabled && {opacity: 0.4},
      ]}
      onPress={onPress}
    >
      <Text style={{fontSize: 16, fontWeight: '600'}}>{'Attack'}</Text>
    </Pressable>
  );
});

type AttackProps = {
  disabled?: boolean;
  onAttack?: ({opponentDamage, yourDamage}: ResultAttack) => void;
};

export type ResultAttack = {yourDamage: number[]; opponentDamage: number[]};
