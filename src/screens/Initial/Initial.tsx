import {api} from '@shared/api';
import {PokemonItem} from '@shared/api/pokemon/types';
import {useAppSelector} from '@shared/store';
import {PokemonBlock} from '@shared/ui/PokemonBlock/PokemonBlock';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {ChangePokemonButton} from './ChangePokemonButton/ChangePokemonButton';
import {FightResult} from './FightResult/FightResult';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Initial: FC = () => {
  const [playerPokemon, setPlayerPokemon] = useState<PokemonItem | undefined>(undefined);
  const [opponentPokemon, setOpponentPokemon] = useState<PokemonItem | undefined>(undefined);
  const {navigate} = useNavigation();

  const fightRecap = useAppSelector(state => state.fightResult.fightRecap);

  const {opponent, you} = useMemo(() => {
    if (playerPokemon && opponentPokemon) {
      const resRecap = fightRecap[`${playerPokemon.name}-${opponentPokemon.name}`];
      if (resRecap) {
        return resRecap;
      }
    }
    return {you: undefined, opponent: undefined};
  }, [fightRecap, opponentPokemon, playerPokemon]);

  useEffect(() => {
    getPokemon(setPlayerPokemon);
    getPokemon(setOpponentPokemon);
  }, []);

  const getPokemon = async (callback: React.Dispatch<React.SetStateAction<PokemonItem | undefined>>) => {
    try {
      const pokemon = await api.pokemon.getRandomPokemon();
      callback(pokemon);
    } catch (error) {
      Alert.alert('Error', "Can't get pokemon. Try one more time");
    }
  };

  const onPressFight = () => {
    if (playerPokemon && opponentPokemon) {
      navigate('Fight', {playerPokemon, opponentPokemon});
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.pokemonBlock}>
          <Text style={styles.pokemonBlockTitle}>{'Your Pokemon'}</Text>
          <PokemonBlock item={playerPokemon} />
          <ChangePokemonButton onPress={() => getPokemon(setPlayerPokemon)} />
        </View>
        <View style={styles.pokemonBlock}>
          <Text style={styles.pokemonBlockTitle}>{'Opponent Pokemon'}</Text>
          <PokemonBlock item={opponentPokemon} />
          <ChangePokemonButton onPress={() => getPokemon(setOpponentPokemon)} />
        </View>
      </View>
      <View style={{flex: 1, marginTop: 16}}>
        <FightResult you={you} opponent={opponent} />
      </View>
      {playerPokemon && opponentPokemon && (
        <AnimatedPressable style={styles.fightButton} entering={FadeIn} exiting={FadeOut} onPress={onPressFight}>
          <Text style={styles.fightTitle}>{'Fight'}</Text>
        </AnimatedPressable>
      )}
    </View>
  );
};
