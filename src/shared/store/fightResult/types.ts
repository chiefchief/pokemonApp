export type Score = number[];

export type FightResultState = {
  fightRecap: Record<string, {you: Score; opponent: Score}>;
};

export type GameResult = {
  playerPokemon: string;
  opponentPokemon: string;
  isPlayerWin: boolean;
};
