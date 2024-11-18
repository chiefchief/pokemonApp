import {createStaticNavigation, StaticParamList} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Fight, Initial} from '@screens';
import {PokemonItem} from '@shared/api/pokemon/types';

export type RootParamList = {
  Initial: undefined;
  Fight: {playerPokemon: PokemonItem; opponentPokemon: PokemonItem};
};

const RootStack = createNativeStackNavigator({
  screens: {
    Initial: {
      screen: Initial,
      options: {headerShown: false},
    },
    Fight: {
      screen: Fight,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;
