import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useCallback, useRef, useState} from 'react';
import {Modal, Pressable, StyleSheet, useWindowDimensions, View, Text} from 'react-native';
import {HPBar} from './HPBar/HPBar';
import {PokemonItem} from '@shared/api/pokemon/types';
import {Attack, ResultAttack} from './Attack/Attack';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Dice} from './Dice/Dice';
import {getTotalDamage} from '@shared/helpers/getTotalDamage';
import {useAppDispatch} from '@shared/store';
import {setGameResult} from '@shared/store/fightResult/fightResult';

type ParamListBase = {
  Fight: {playerPokemon: PokemonItem; opponentPokemon: PokemonItem};
};
export const Fight: FC = () => {
  const {width} = useWindowDimensions();
  const {params} = useRoute<RouteProp<ParamListBase, 'Fight'>>();
  const {playerPokemon, opponentPokemon} = params;

  const [isAttacking, setIsAttacking] = useState(false);

  const yourHpRef = useRef<HPBar>(null);
  const opponentHpRef = useRef<HPBar>(null);

  const [playerDamage, setPlayerDamage] = useState<number[]>([]);
  const [opponentDamage, setOpponentDamage] = useState<number[]>([]);
  const [isWin, setIsWin] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const animationProgress = useSharedValue(0);

  const dispatch = useAppDispatch();
  const {goBack} = useNavigation();

  const pokemonSize = width / 3;

  const attack = (damage: ResultAttack) => {
    const resYourDamage = getTotalDamage(damage.yourDamage);
    const resOpponentDamage = getTotalDamage(damage.opponentDamage);

    yourHpRef.current?.dealDamage(resOpponentDamage);
    opponentHpRef.current?.dealDamage(resYourDamage);
  };

  const onAttack = (damage: ResultAttack) => {
    setPlayerDamage(damage.yourDamage);
    setOpponentDamage(damage.opponentDamage);
    setIsAttacking(true);

    animationProgress.value = withSequence(
      withTiming(1, {duration: 240}, isFinished => {
        if (isFinished) {
          runOnJS(attack)(damage);
        }
      }),
      withTiming(0, {duration: 120}, isFinished => {
        if (isFinished) {
          runOnJS(setIsAttacking)(false);
        }
      }),
    );
  };

  const playerPokemonStyle = useAnimatedStyle(() => ({
    left: interpolate(animationProgress.value, [0, 1], [0, width / 3]),
  }));

  const opponentPokemonStyle = useAnimatedStyle(() => ({
    right: interpolate(animationProgress.value, [0, 1], [0, width / 3]),
  }));

  const onPlayerDied = useCallback(() => {
    console.log({}, 'HERE1');
    setIsWin(false);
    setIsVisibleModal(true);
    dispatch(
      setGameResult({opponentPokemon: opponentPokemon.name, playerPokemon: playerPokemon.name, isPlayerWin: false}),
    );
  }, [dispatch, opponentPokemon.name, playerPokemon.name]);

  const onOpponentDied = useCallback(() => {
    console.log({}, 'HERE');

    setIsWin(true);
    setIsVisibleModal(true);
    dispatch(
      setGameResult({opponentPokemon: opponentPokemon.name, playerPokemon: playerPokemon.name, isPlayerWin: true}),
    );
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <HPBar ref={yourHpRef} title={playerPokemon.name} onDied={onPlayerDied} />
          <HPBar ref={opponentHpRef} title={opponentPokemon.name} onDied={onOpponentDied} />
        </View>
        <View style={{flexDirection: 'row', height: 40, marginVertical: 16, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            {playerDamage.map((item, index) => (
              <Dice damage={item} key={`${index}`} />
            ))}
          </View>
          <View style={{flexDirection: 'row'}}>
            {opponentDamage.map((item, index) => (
              <Dice damage={item} key={`${index}`} />
            ))}
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Animated.Image
            source={{uri: playerPokemon.image}}
            style={[{width: pokemonSize, aspectRatio: 1, position: 'absolute', left: 0}, playerPokemonStyle]}
          />
          <Animated.Image
            source={{uri: opponentPokemon.image}}
            style={[{width: pokemonSize, aspectRatio: 1, position: 'absolute', right: 0}, opponentPokemonStyle]}
          />
        </View>
        <Attack disabled={isAttacking} onAttack={onAttack} />
      </View>
      <Modal visible={isVisibleModal} transparent animationType={'fade'}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#00000099',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{fontSize: 32, fontWeight: '600', color: 'white'}}>{isWin ? 'You WIN!' : 'Game Over'}</Text>
          <Pressable
            style={{
              marginTop: 16,
              height: 40,
              borderRadius: 12,
              backgroundColor: 'white',
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setIsVisibleModal(false);
              goBack();
            }}
          >
            <Text>{'GoBack'}</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};
