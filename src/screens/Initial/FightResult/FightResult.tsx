import React, {memo, useState} from 'react';
import {View, Text, Pressable, ListRenderItem} from 'react-native';

import {styles} from './styles';
import {Score} from '@shared/store/fightResult/types';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {WinLoseTitle} from '../WinLoseTitle/WinLoseTitle';
import {getTotalDamage} from '@shared/helpers/getTotalDamage';

const keyExtractor = (_item: number, index: number) => `${index}`;

export const FightResult = memo<FightResultProps>(({opponent, you}) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const yourScore = getTotalDamage(you);
  const opponentScore = getTotalDamage(opponent);

  const renderItem: ListRenderItem<number> = ({index}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <WinLoseTitle value={you![index]} />
      <WinLoseTitle value={opponent![index]} />
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>{`${yourScore}:${opponentScore}`}</Text>
      {yourScore || opponentScore ? (
        <Pressable style={styles.showDetailedButton} onPress={() => setIsShowingDetails(prev => !prev)}>
          <Text style={styles.showDetailedTitle}>{isShowingDetails ? 'Hide Details' : 'Show Details'}</Text>
        </Pressable>
      ) : null}

      {isShowingDetails && (
        <Animated.FlatList
          data={you}
          entering={FadeInUp}
          exiting={FadeOutUp}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </View>
  );
});

type FightResultProps = {
  you: Score | undefined;
  opponent: Score | undefined;
};
