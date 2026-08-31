import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import AvatarBadge from '../components/AvatarBadge';
import { useCharacters } from '../context/CharactersContext';
import { AVATARS, CLASSES } from '../data/characterOptions';
import { colors } from '../theme';

export default function CharacterFormScreen({ navigation }) {
  const { addCharacter } = useCharacters();
  const [name, setName] = useState('');
  const [className, setClassName] = useState(null);
  const [power, setPower] = useState('');
  const [avatarId, setAvatarId] = useState(null);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const powerValue = Number(power);

    if (!trimmedName) {
      Alert.alert('Помилка', 'Введіть ім’я персонажа.');
      return;
    }
    if (!className) {
      Alert.alert('Помилка', 'Оберіть клас персонажа.');
      return;
    }
    if (!power || Number.isNaN(powerValue) || powerValue <= 0 || powerValue > 100) {
      Alert.alert('Помилка', 'Введіть силу — число від 1 до 100.');
      return;
    }
    if (!avatarId) {
      Alert.alert('Помилка', 'Оберіть зображення персонажа.');
      return;
    }

    addCharacter({ name: trimmedName, className, power: powerValue, avatarId });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Ім'я персонажа</Text>
      <TextInput
        style={styles.input}
        placeholder="Наприклад, Ґендальф"
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Клас</Text>
      <View style={styles.chipsRow}>
        {CLASSES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, className === item && styles.chipActive]}
            onPress={() => setClassName(item)}
          >
            <Text
              style={[styles.chipText, className === item && styles.chipTextActive]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Сила (1–100)</Text>
      <TextInput
        style={styles.input}
        placeholder="Наприклад, 75"
        placeholderTextColor={colors.textMuted}
        value={power}
        onChangeText={setPower}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Зображення</Text>
      <View style={styles.avatarsGrid}>
        {AVATARS.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarSlot,
              avatarId === avatar.id && styles.avatarSlotActive,
            ]}
            onPress={() => setAvatarId(avatar.id)}
          >
            <AvatarBadge avatarId={avatar.id} size={48} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Створити персонажа</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#fff',
  },
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  avatarSlot: {
    padding: 4,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSlotActive: {
    borderColor: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
