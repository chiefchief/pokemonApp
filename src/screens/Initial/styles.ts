import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
  pokemonBlock: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  pokemonBlockTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  fightButton: {
    height: 40,
    backgroundColor: 'red',
    marginBottom: 40,
    marginTop: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  fightTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
