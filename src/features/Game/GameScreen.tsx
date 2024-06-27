import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { cap, getRandomPokemon } from '../../helpers/utils';
import PokemonShort from '../../types/PokemonShort';
import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

interface Props {
  navigation: any;
}

const blackMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];

const normalMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

const GameScreen: React.FC<Props> = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  const pokemons = useSelector((state: RootState) => state.pokemonIndex.pokemons).filter(
    (pokemon) => pokemon.id < 9999,
  );
  const [gameWon, setGameWon] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [activePokemon, setActivePokemon] = useState<PokemonShort>();
  const [guessPokemonsNames, setGuessPokemonsNames] = useState<string[]>([]);

  const image = useImage(activePokemon?.imageUrl);

  const newGameRound = () => {
    const winPokemon = getRandomPokemon(pokemons);
    setActivePokemon(winPokemon);
    let nameArr: string[] = [];
    for (let i = 0; i < 3; i++) {
      nameArr.push(getRandomPokemon(pokemons).name);
    }

    nameArr.splice(Math.floor(Math.random() * 3), 0, winPokemon.name);
    setGuessPokemonsNames(nameArr);
    setGameActive(true);
  };

  const guess = (name: string) => {
    setGameWon(name === activePokemon?.name);
    setGameActive(false);
  };

  useEffect(() => {
    newGameRound();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.gameTitle}>
            {gameActive ? "Who's that Pokémon?" : `It's ${cap(activePokemon?.name || '')}!`}
          </Text>
        </View>
        <Canvas style={{ flex: 1 }}>
          <Image
            image={image}
            fit='fitHeight'
            x={width * 0.15}
            y={width * 0.05}
            width={width * 0.7}
            height={width * 0.7}
          >
            <ColorMatrix matrix={gameActive ? blackMatrix : normalMatrix} />
          </Image>
        </Canvas>
      </View>
      <View style={styles.guessContainer}>
        {gameActive ? (
          guessPokemonsNames.map((name, index) => (
            <TouchableOpacity
              key={`${name}+${index}`}
              style={styles.guessCard}
              activeOpacity={0.7}
              onPress={() => guess(name)}
            >
              <Text style={styles.guessCardText}>{cap(name)}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.gameOverText, { color: gameWon ? '#00C851' : '#FF4444' }]}>
              {gameWon ? 'You win!' : 'You lose..'}
            </Text>
            <TouchableOpacity style={styles.guessCard} onPress={() => newGameRound()}>
              <Text style={styles.guessCardText}>Play again</Text>
            </TouchableOpacity>
          </View>
        )}
        {}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  guessContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  guessCard: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  guessCardText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#333',
  },
  gameOverText: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    marginBottom: 32,
  },
  gameTitle: {
    fontFamily: 'Roboto-Medium',
    color: '#333',
    fontSize: 24,
    marginTop: 24,
  },
});

export default GameScreen;
