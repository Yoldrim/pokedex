import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { cap, getRandomPokemon } from '../../helpers/utils';
import PokemonShort from '../../types/PokemonShort';
import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { setHighScore } from '../../reducers/highscoreSlice';

interface Props {
  navigation: any;
}

const blackMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];

const normalMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

const GameScreen: React.FC<Props> = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const dispatch = useDispatch();

  const pokemons = useSelector((state: RootState) => state.pokemonIndex.pokemons).filter(
    (pokemon) => pokemon.id < 9999,
  );
  const highScore = useSelector((state: RootState) => state.highScore.highScore);
  const [gameWon, setGameWon] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [score, setScore] = useState(0);
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
    const gameWon = name === activePokemon?.name;
    if (gameWon) {
      setScore(score + 1);
      setGameWon(true);
    } else {
      if (score > highScore) {
        dispatch(setHighScore(score));
        setIsNewHighScore(true);
      } else {
        setIsNewHighScore(false);
      }
      setScore(0);
      setGameWon(false);
    }
    setGameActive(false);
  };

  const onPlayAgainPressed = () => {
    newGameRound();
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
          <Text>Score: {score}</Text>
        </View>
        <Canvas style={{ flex: 1 }}>
          <Image
            image={image}
            fit='fitHeight'
            x={width * 0.15}
            y={width * 0.04}
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
            {!gameWon && (
              <View style={styles.highScoreContainer}>
                <Text style={styles.highScoreText}>
                  {isNewHighScore ? 'New High Score!\n' : ''} High Score: {highScore}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.guessCard} onPress={onPlayAgainPressed}>
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
    marginBottom: 4,
  },
  scoreText: {},
  highScoreContainer: {
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highScoreText: {
    fontFamily: 'Roboto-Medium',
    color: '#333',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default GameScreen;
