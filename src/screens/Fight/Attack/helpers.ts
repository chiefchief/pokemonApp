export const getTheDamage = () => {
  let total = [];
  let currentRoll;

  do {
    currentRoll = Math.floor(Math.random() * 6) + 1;
    total.push(currentRoll);
  } while (currentRoll === 6);

  return total;
};
