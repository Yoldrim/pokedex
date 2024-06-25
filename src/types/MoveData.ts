import { Move, NamedAPIResource } from 'pokenode-ts';

export interface MoveData {
  move: Move;
  move_learn_method: NamedAPIResource;
  level_learned_at: number;
}
