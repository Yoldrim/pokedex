import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { HomeNavigatorProps } from '../../navigation/HomeNavigator';
import PokemonCard from './PokemonCard';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { PokemonShort } from '../../types';
import { buildStorage } from 'axios-cache-interceptor';
import PokemonList from '../../components/PokemonList';

const PAGINATION_LIMIT = 40;

const PokedexScreen: React.FC<HomeNavigatorProps['StackHome']> = ({ navigation, route }) => {
  const [pokemons, setPokemons] = useState<PokemonShort[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const api = new PokemonClient();
    const pokemonsApiResource = (await api.listPokemons(offset, PAGINATION_LIMIT)).results;

    const pokemonPromises: Promise<Pokemon>[] = [];
    pokemonsApiResource.forEach((p) => {
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

    setPokemons([...pokemons, ...pokemonResults]);
    setOffset(offset + PAGINATION_LIMIT);
    setIsLoading(false);
  }, [offset, pokemons]);

  useEffect(() => {
    fetchData().catch((err) => console.log(err.response));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PokemonList
        pokemons={pokemons}
        navigation={navigation}
        onEndReached={fetchData}
        isLoading={isLoading}
        onPokemonPressed={(pokemon) =>
          navigation.push('PokemonScreen', {
            pokemon,
          })
        }
      />
    </View>
  );
};

export default PokedexScreen;
