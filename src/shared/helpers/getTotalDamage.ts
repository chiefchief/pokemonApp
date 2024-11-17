import {Score} from '@shared/store/fightResult/types';

export const getTotalDamage = (array: Score | undefined) => {
  if (!array) {
    return 0;
  }
  return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
