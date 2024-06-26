import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import PokemonCard from '../features/Pokedex/PokemonCard';
import { PokemonShort } from '../types';

interface Props {
  pokemons: PokemonShort[];
  navigation: any;
  onPokemonPressed?: (pokemon: PokemonShort) => void;
  isLoading?: boolean;
  onEndReached?: () => void;
}

const PokemonList: React.FC<Props> = ({ pokemons, onPokemonPressed, onEndReached, isLoading }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ paddingHorizontal: 12 }}
        numColumns={2}
        data={pokemons}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={() => onPokemonPressed && onPokemonPressed(item)} />
        )}
        keyExtractor={(item) => `${item.id.toString()}_${item.name}`}
        ListFooterComponent={() => isLoading && <ActivityIndicator style={{ marginVertical: 16 }} />}
        ListEmptyComponent={() => (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <Text style={{ color: '#999', fontFamily: 'Roboto-Regular' }}>No pokemon found.</Text>
          </View>
        )}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default PokemonList;
