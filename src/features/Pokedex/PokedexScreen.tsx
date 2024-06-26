import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HomeNavigatorProps } from '../../navigation/HomeNavigator';
import PokemonCard from './PokemonCard';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { PokemonShort } from '../../types';
import { buildStorage } from 'axios-cache-interceptor';
import PokemonList from '../../components/PokemonList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { addPokemonsToIndex, sortPokemonIndex } from '../../reducers/indexedPokemonsSlice';
import Fuse from 'fuse.js';

const PAGINATION_LIMIT = 40;

const PokedexScreen: React.FC<HomeNavigatorProps['StackHome']> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const pokemonIndexState = useSelector((state: RootState) => state.pokemonIndex);
  const [fuse, setFuse] = React.useState<Fuse<PokemonShort>>();
  const [offset, setOffset] = useState(40);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchString, setLastSearchString] = useState('');
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonShort[]>([]);

  const pokemons = useMemo(
    () => pokemonIndexState.pokemons.filter((item) => item.id < 9999).slice(0, offset),
    [pokemonIndexState, offset],
  );

  const loadMoreData = useCallback(async () => {
    if (offset < pokemonIndexState.currentCount) {
      setIsLoading(true);
      setOffset(offset + 40);
    }

    setIsLoading(false);
  }, [offset, pokemons]);

  useEffect(() => {
    const f = new Fuse(
      pokemonIndexState.pokemons.filter((item) => item.id < 9999),
      { keys: ['name'], threshold: 0.4 },
    );
    setFuse(f);
    (async () => {
      const api = new PokemonClient();
      const probeRes = await api.listPokemons(0, 1);

      const LIMIT = 40;
      let offset = 0;
      if (pokemonIndexState.currentCount !== probeRes.count) {
        while (offset < probeRes.count) {
          const res = await api.listPokemons(offset, LIMIT);
          const pokemonPromises: Promise<Pokemon>[] = [];
          res.results.forEach((p) => {
            pokemonPromises.push(api.getPokemonByName(p.name));
          });
          const pokemonResults = (await Promise.all(pokemonPromises)).map(
            (pokemon) =>
              ({
                id: pokemon.id,
                name: pokemon.name,
                imageUrl: pokemon.sprites.front_default,
                types: pokemon.types,
              }) as PokemonShort,
          );

          dispatch(addPokemonsToIndex({ pokemons: pokemonResults, maxCount: probeRes.count }));
          offset += LIMIT;
        }
        dispatch(sortPokemonIndex());
      }
    })();
  }, []);

  const onChangeText = useCallback(
    (input: string) => {
      if (input.length < 2) {
        setLastSearchString(input);
        return;
      }

      const rv = fuse?.search(input).map((res) => res.item);
      setSearchedPokemons(rv || []);
      setLastSearchString(input);
    },
    [pokemons],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <TextInput style={styles.searchInput} placeholder={'Search'} onChangeText={onChangeText} />
      </View>
      <PokemonList
        pokemons={lastSearchString.length > 2 ? searchedPokemons : pokemons}
        navigation={navigation}
        onEndReached={loadMoreData}
        isLoading={isLoading}
        onPokemonPressed={(pokemon) =>
          navigation.push('PokemonScreen', {
            pokemon,
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Roboto-Regular',
    color: '#333',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    marginTop: 12,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',

    fontSize: 18,

    // shadowColor: '#333',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    //
    // elevation: 3,
  },
});

export default PokedexScreen;
