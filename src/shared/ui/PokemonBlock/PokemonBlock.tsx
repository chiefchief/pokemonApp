import {PokemonItem} from '@shared/api/pokemon/types';
import React, {memo} from 'react';
import {ActivityIndicator, Image, Text, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {styles} from './styles';

export const PokemonBlock = memo<PokemonBlockProps>(({item}) => {
  const {width} = useWindowDimensions();
  const blockSize = width / 5;

  return item ? (
    <Animated.View>
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{uri: item.image}} style={{width: blockSize, height: blockSize}} />
    </Animated.View>
  ) : (
    <ActivityIndicator />
  );
});

type PokemonBlockProps = {
  item: PokemonItem | undefined;
};
