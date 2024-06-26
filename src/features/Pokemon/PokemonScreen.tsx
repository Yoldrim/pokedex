import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import colors from '../../helpers/colors';
import { LinearGradient } from 'expo-linear-gradient';
import type { HomeNavigatorProps } from '../../navigation/HomeNavigator';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { cap, getIdFromNamedAPIResource } from '../../helpers/utils';
import AboutMenu from './AboutMenu';
import {
  ChainLink,
  EvolutionClient,
  Move,
  MoveClient,
  NamedAPIResource,
  Pokemon,
  PokemonClient,
  PokemonMove,
  PokemonSpecies,
  PokemonType,
} from 'pokenode-ts';
import StatsMenu from './StatsMenu';
import MovesMenu from './MovesMenu';
import { EvolutionChain, MoveSectionData } from '../../types';
import EvolutionsMenu from './EvolutionsMenu';
import pokemonShort from '../../types/PokemonShort';

const getMoveSetShortFromMoves = (moves: PokemonMove[]) => {
  const movesGroupedByVersion: {
    [version: string]: { move: PokemonMove['move']; move_learn_method: NamedAPIResource; level_learned_at: number }[];
  } = {};
  moves.forEach((move) => {
    move.version_group_details.forEach((version) => {
      const obj = {
        move: move.move,
        move_learn_method: version.move_learn_method,
        level_learned_at: version.level_learned_at,
      };
      if (movesGroupedByVersion[version.version_group.name]) {
        movesGroupedByVersion[version.version_group.name].push(obj);
      } else {
        movesGroupedByVersion[version.version_group.name] = [obj];
      }
    });
  });

  const resMoves: {
    [version: string]: {
      [method: string]: {
        move: PokemonMove['move'];
        move_learn_method: NamedAPIResource;
        level_learned_at: number;
      }[];
    };
  } = {};

  Object.keys(movesGroupedByVersion).map((version) => {
    const temp: {
      [method: string]: {
        move: PokemonMove['move'];
        move_learn_method: NamedAPIResource;
        level_learned_at: number;
      }[];
    } = {};

    movesGroupedByVersion[version].map((move) => {
      if (temp[move.move_learn_method.name]) {
        // filter out duplicates
        if (temp[move.move_learn_method.name].findIndex((d) => d.move.name === move.move.name) < 0) {
          temp[move.move_learn_method.name].push(move);
        }
      } else {
        temp[move.move_learn_method.name] = [move];
      }
    });
    resMoves[version] = temp;
  });

  const movesByMethod = resMoves[Object.keys(resMoves)[0]];
  return Object.keys(movesByMethod)
    .map((key) => ({ title: key, data: movesByMethod[key] }))
    .sort((a, b) => (a.title > b.title ? 1 : -1));
};

interface MenuItemProps {
  title: string;
  onPress: () => void;
  selected: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, onPress, selected }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.menuText, selected ? { color: '#333' } : {}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const PokemonScreen: React.FC<HomeNavigatorProps['PokemonScreen']> = ({ navigation, route }) => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  const [loading, setLoading] = useState(true);

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [selectedMenuItem, setSelectedMenuItem] = useState('About');
  const [speciesInfo, setSpeciesInfo] = useState<PokemonSpecies | undefined>(undefined);
  const [movesInfo, setMovesInfo] = useState<MoveSectionData[]>([]);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>({});

  useEffect(() => {
    (async () => {
      const api = new PokemonClient();
      const moveApi = new MoveClient();
      const evolution = new EvolutionClient();

      const pokemonRes = await api.getPokemonByName(route.params.pokemon.name);
      setPokemon(pokemonRes);

      // Get species data
      const speciesRes = await api.getPokemonSpeciesById(getIdFromNamedAPIResource(pokemonRes.species));
      setSpeciesInfo(speciesRes);

      // Get evolution data
      const evolutionChainUrlSplit = speciesRes.evolution_chain.url.split('/');
      const evChainRes = await evolution.getEvolutionChainById(
        +evolutionChainUrlSplit[evolutionChainUrlSplit.length - 2],
      );

      const obj: EvolutionChain = {};
      const traverseEvolutionChain = async (chain: ChainLink, order: number) => {
        const _pokemon = await api.getPokemonById(getIdFromNamedAPIResource(chain.species));
        obj[order] = {
          id: _pokemon.id,
          name: chain.species.name,
          imageUrl: _pokemon.sprites.front_default as string,
          types: _pokemon.types,
          minLevel: chain.evolution_details[0]?.min_level || 0,
        };
        if (chain.evolves_to.length !== 0) {
          await traverseEvolutionChain(chain.evolves_to[0], order + 1);
        }
      };
      await traverseEvolutionChain(evChainRes.chain, 1);
      setEvolutionChain(obj);

      // Get moves data
      const moveSetShort = getMoveSetShortFromMoves(pokemonRes.moves);
      const movesRes = await Promise.all(
        moveSetShort.map(async (moveMethodGroup) => {
          const newMoveData = (
            await Promise.all(
              moveMethodGroup.data.map(async (move) => {
                const moveData = await moveApi.getMoveByName(move.move.name);
                return {
                  move: moveData,
                  move_learn_method: move.move_learn_method,
                  level_learned_at: move.level_learned_at,
                };
              }),
            )
          ).sort((a, b) => (a.level_learned_at > b.level_learned_at ? 1 : -1));

          return { title: moveMethodGroup.title, data: newMoveData };
        }),
      );

      setMovesInfo(movesRes);
      setLoading(false);
    })();
  }, []);

  const pokemonImage = useImage(route.params.pokemon.imageUrl);
  const menuItems = useMemo(() => {
    return [
      {
        title: 'About',
        onPress: () => setSelectedMenuItem('About'),
        component: pokemon ? <AboutMenu pokemon={pokemon as Pokemon} speciesInfo={speciesInfo} /> : null,
      },
      {
        title: 'Stats',
        onPress: () => setSelectedMenuItem('Stats'),
        component: pokemon ? <StatsMenu pokemon={pokemon as Pokemon} /> : null,
      },
      {
        title: 'Moves',
        onPress: () => setSelectedMenuItem('Moves'),
        component: pokemon ? <MovesMenu moves={movesInfo} /> : null,
      },
      {
        title: 'Evolutions',
        onPress: () => setSelectedMenuItem('Evolutions'),
        component: pokemon ? <EvolutionsMenu evolutionChain={evolutionChain} /> : null,
      },
    ];
  }, [pokemon, speciesInfo, movesInfo]);

  const typeColor = useMemo(
    () => colors.pokemonTypeColors[route.params.pokemon?.types[0].type.name] || '#fff',
    [route.params.pokemon],
  );
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[typeColor, typeColor, colors.theme.background]}
        style={styles.background}
        locations={[0, 0.3, 0.5]}
      />
      <View style={{ flex: 4 }}>
        <Canvas style={{ flex: 1 }}>
          <Image
            image={pokemonImage}
            fit='fitHeight'
            x={width * 0.15}
            y={width * 0.2}
            width={width * 0.7}
            height={width * 0.7}
          />
        </Canvas>
      </View>
      <View style={{ flex: 5, marginTop: 48 }}>
        <View style={styles.titleContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.titleText}>{cap(route.params.pokemon.name)}</Text>
            <Text style={styles.subtitleText}>{cap(route.params.pokemon.types[0].type.name)} Pokémon</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              selected={selectedMenuItem === item.title}
              title={item.title}
              onPress={item.onPress}
            />
          ))}
        </View>
        <View style={styles.menuContentContainer}>
          {loading ? <ActivityIndicator /> : menuItems.find((item) => selectedMenuItem === item.title)?.component}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#444',
    fontFamily: 'Roboto-Light',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#999',
  },
  menuItem: {
    padding: 8,
  },
  menuContentContainer: {
    paddingBottom: 96,
    marginTop: 16,
  },
});

export default PokemonScreen;
