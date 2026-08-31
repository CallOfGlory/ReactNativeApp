import { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AvatarBadge from '../components/AvatarBadge';
import { useCharacters } from '../context/CharactersContext';
import { CLASSES } from '../data/characterOptions';
import { colors } from '../theme';

function CharacterCard({ character }) {
  return (
    <View style={styles.card}>
      <AvatarBadge avatarId={character.avatarId} size={56} />
      <Text style={styles.cardName} numberOfLines={1}>
        {character.name}
      </Text>
      <Text style={styles.cardClass}>{character.className}</Text>
      <Text style={styles.cardPower}>Сила: {character.power}</Text>
    </View>
  );
}

function CharacterListRow({ character }) {
  return (
    <View style={styles.row}>
      <AvatarBadge avatarId={character.avatarId} size={44} />
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{character.name}</Text>
        <Text style={styles.rowClass}>{character.className}</Text>
      </View>
      <Text style={styles.rowPower}>{character.power}</Text>
    </View>
  );
}

export default function CharactersListScreen({ navigation }) {
  const { characters } = useCharacters();
  const [mode, setMode] = useState('grid'); // 'grid' | 'sections'

  const sections = useMemo(() => {
    return CLASSES.map((className) => ({
      title: className,
      data: characters.filter((c) => c.className === className),
    })).filter((section) => section.data.length > 0);
  }, [characters]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Персонажі</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate('CharacterForm')}
        >
          <Text style={styles.newButtonText}>+ Новий</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, mode === 'grid' && styles.toggleButtonActive]}
          onPress={() => setMode('grid')}
        >
          <Text style={[styles.toggleText, mode === 'grid' && styles.toggleTextActive]}>
            Сітка
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, mode === 'sections' && styles.toggleButtonActive]}
          onPress={() => setMode('sections')}
        >
          <Text style={[styles.toggleText, mode === 'sections' && styles.toggleTextActive]}>
            За класами
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'grid' ? (
        <FlatList
          data={characters}
          key="grid"
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <CharacterCard character={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Персонажів ще немає</Text>
          }
        />
      ) : (
        <SectionList
          key="sections"
          sections={sections}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>
              {section.title} ({section.data.length})
            </Text>
          )}
          renderItem={({ item }) => <CharacterListRow character={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Персонажів ще немає</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  newButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    alignItems: 'center',
    width: '48%',
    marginBottom: 14,
  },
  cardName: {
    color: colors.text,
    fontWeight: '700',
    marginTop: 8,
    fontSize: 14,
  },
  cardClass: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  cardPower: {
    color: colors.warning,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  sectionHeader: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 8,
  },
  rowInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rowName: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  rowClass: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  rowPower: {
    color: colors.warning,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
