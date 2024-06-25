import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../../helpers/colors';
import { LinearGradient } from 'expo-linear-gradient';
import type { HomeNavigatorProps } from '../../navigation/HomeNavigator';
import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { cap } from '../../helpers/utils';
import AboutMenu from './AboutMenu';
import { PokemonClient, PokemonSpecies } from 'pokenode-ts';
import StatsMenu from './StatsMenu';
import MovesMenu from './MovesMenu';

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

  const [selectedMenuItem, setSelectedMenuItem] = useState('Stats');
  const [speciesInfo, setSpeciesInfo] = useState<PokemonSpecies | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const api = new PokemonClient();
      const res = await api.getPokemonSpeciesByName(route.params.pokemon.name);
      setSpeciesInfo(res);
    })();
  }, []);

  const pokemonImage = useImage(route.params.pokemon.sprites.front_default);
  const menuItems = useMemo(
    () => [
      {
        title: 'About',
        onPress: () => setSelectedMenuItem('About'),
        component: <AboutMenu pokemon={route.params.pokemon} speciesInfo={speciesInfo} />,
      },
      {
        title: 'Stats',
        onPress: () => setSelectedMenuItem('Stats'),
        component: <StatsMenu pokemon={route.params.pokemon} />,
      },
      {
        title: 'Moves',
        onPress: () => setSelectedMenuItem('Moves'),
        component: <MovesMenu moves={route.params.pokemon.moves} />,
      },
      {
        title: 'Evolutions',
        onPress: () => setSelectedMenuItem('Evolutions'),
        component: null,
      },
    ],
    [route.params.pokemon, speciesInfo],
  );

  const typeColor = useMemo(
    () => colors.pokemonTypeColors[route.params.pokemon?.types[0].type.name] || '#fff',
    [route.params.pokemon],
  );
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[typeColor, typeColor, colors.theme.background]}
        style={styles.background}
        locations={[0, 0.35, 0.55]}
      />
      <View style={{ flex: 1 }}>
        <Canvas style={{ flex: 1 }}>
          <Image
            image={pokemonImage}
            fit='fitHeight'
            x={width * 0.1}
            y={width * 0.15}
            width={width * 0.8}
            height={width * 0.8}
          />
        </Canvas>
      </View>
      <View style={{ flex: 1, marginTop: 48 }}>
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
          {menuItems.find((item) => selectedMenuItem === item.title)?.component}
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
