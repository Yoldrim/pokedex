import React, { useMemo } from 'react';
import { MoveData } from '../../types';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  getPrintableMoveString,
  getTypeIconFromName,
  sanitizePokemonString,
  sanitizeString,
} from '../../helpers/utils';
import CollapsableContainer from '../../components/CollapsableContainer';

interface Props {
  move: MoveData;
}

const MoveListCard: React.FC<Props> = ({ move }) => {
  const [contentExpanded, setContentExpanded] = React.useState(false);

  const descriptionText = useMemo(() => {
    const text = move.move?.flavor_text_entries?.find((text) => text.language.name === 'en')?.flavor_text;
    return text ? sanitizePokemonString(text) : '';
  }, [move]);

  return (
    <TouchableOpacity
      onPress={() => setContentExpanded(!contentExpanded)}
      activeOpacity={0.8}
      style={styles.moveCardContainer}
    >
      <View style={styles.moveCardTopRow}>
        <View style={styles.moveCardTitleRow}>
          <Image style={styles.moveTypeIcon} source={getTypeIconFromName(move.move.type.name)} />
          <Text style={styles.moveText}>{getPrintableMoveString(move.move.name)}</Text>
        </View>
        <View style={styles.chevronContainer}>
          <Icon name={'chevron-down'} size={20} color={'#333'} />
        </View>
      </View>
      <CollapsableContainer expanded={contentExpanded}>
        <View style={styles.moveDescriptionContainer}>
          <Text style={styles.moveDescriptionText}>{descriptionText}</Text>
        </View>
        <View style={styles.moveDetailsContainer}>
          <View style={styles.moveDetailsMember}>
            <Text style={styles.moveDetailsTitle}>{move.move.power !== null ? move.move.power : '-'}</Text>
            <Text style={styles.moveDetailsSubtitle}>Power</Text>
          </View>
          <View style={styles.moveDetailsDivider} />
          <View style={styles.moveDetailsMember}>
            <Text style={styles.moveDetailsTitle}>{move.move.pp}</Text>
            <Text style={styles.moveDetailsSubtitle}>PP</Text>
          </View>
        </View>
        <View style={styles.moveDetailsContainer}>
          <View style={styles.moveDetailsMember}>
            <Text style={styles.moveDetailsTitle}>{move.level_learned_at !== 0 ? move.level_learned_at : '-'}</Text>
            <Text style={styles.moveDetailsSubtitle}>Learned at level</Text>
          </View>
          <View style={styles.moveDetailsDivider} />
          <View style={styles.moveDetailsMember}>
            <Text style={styles.moveDetailsTitle}>{move.move.accuracy !== null ? `${move.move.accuracy}%` : '-'}</Text>
            <Text style={styles.moveDetailsSubtitle}>Accuracy</Text>
          </View>
        </View>
      </CollapsableContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  moveCardContainer: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,

    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  moveCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moveCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moveText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#444',
  },
  moveTypeIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 6,
  },
  chevronContainer: {
    alignSelf: 'flex-end',
  },
  moveDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  moveDescriptionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  moveDetailsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  moveDetailsMember: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveDetailsDivider: {
    width: 1,
    height: '80%',
    color: '#000',
  },
  moveDetailsTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  moveDetailsSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default React.memo(MoveListCard);
