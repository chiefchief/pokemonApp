import React, {memo} from 'react';
import {styles} from './styles';
import {Pressable, PressableProps, Text} from 'react-native';

export const ChangePokemonButton = memo<PressableProps>(({onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTitle}>{'Change Pokemon'}</Text>
    </Pressable>
  );
});
