import React from 'react';
import { PokemonMove } from 'pokenode-ts';
import { View } from 'react-native';

interface Props {
  moves: PokemonMove[];
}

const MovesMenu: React.FC<Props> = ({ moves }) => {
  console.log(
    JSON.stringify(
      moves.map((move) => move.version_group_details),
      undefined,
      2,
    ),
  );
  return (
    <View>
      <></>
    </View>
  );
};

export default MovesMenu;
