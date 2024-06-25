import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { getPrintableMoveString } from '../../helpers/utils';
import MoveListCard from './MoveListCard';
import { MoveSectionData } from '../../types';

interface Props {
  moves: MoveSectionData[];
}

const MovesMenu: React.FC<Props> = ({ moves }) => {
  return (
    <View>
      <SectionList
        keyExtractor={(item, index) => `${item.move.name}${index}`}
        stickySectionHeadersEnabled={false}
        sections={moves}
        renderItem={({ item }) => <MoveListCard move={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>Learned from {getPrintableMoveString(section.title)}</Text>
          </View>
        )}
        SectionSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    marginTop: 16,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
    color: '#333',
  },
});

export default MovesMenu;
