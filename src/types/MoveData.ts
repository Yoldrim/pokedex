import { Move, NamedAPIResource } from 'pokenode-ts';

interface MoveData {
  move: Move;
  move_learn_method: NamedAPIResource;
  level_learned_at: number;
}

export default MoveData;
