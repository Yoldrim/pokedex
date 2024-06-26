import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { HomeNavigatorProps } from '../../navigation/HomeNavigator';
import PokemonCard from './PokemonCard';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { PokemonShort } from '../../types';
import { buildStorage } from 'axios-cache-interceptor';

const PAGINATION_LIMIT = 40;

const PokedexScreen: React.FC<HomeNavigatorProps['StackHome']> = ({ navigation, route }) => {
  const [pokemons, setPokemons] = useState<PokemonShort[]>([]);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(async () => {
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
  }, [offset, pokemons]);

  useEffect(() => {
    fetchData().catch((err) => console.log(err.response));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ paddingHorizontal: 12 }}
        numColumns={2}
        data={pokemons}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              navigation.push('PokemonScreen', {
                pokemon: item,
              })
            }
          />
        )}
        keyExtractor={(item) => `${item.id.toString()}_${item.name}`}
        ListFooterComponent={() => <ActivityIndicator style={{ marginVertical: 16 }} />}
        onEndReachedThreshold={0.7}
        onEndReached={fetchData}
      />
    </SafeAreaView>
  );
};

export default PokedexScreen;
