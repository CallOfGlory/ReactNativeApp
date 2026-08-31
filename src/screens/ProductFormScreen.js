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
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme';

export default function ProductFormScreen({ navigation, route }) {
  const { products, addProduct, updateProduct } = useProducts();
  const productId = route.params?.productId ?? null;
  const existing = productId ? products.find((p) => p.id === productId) : null;
  const isEditing = !!existing;

  const [name, setName] = useState(existing?.name ?? '');
  const [price, setPrice] = useState(existing ? String(existing.price) : '');
  const [description, setDescription] = useState(existing?.description ?? '');

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const priceValue = Number(price);
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      Alert.alert('Помилка', 'Введіть назву продукту.');
      return;
    }
    if (!price || Number.isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Помилка', 'Введіть коректну ціну (число більше 0).');
      return;
    }

    if (isEditing) {
      updateProduct(existing.id, {
        name: trimmedName,
        price: priceValue,
        description: trimmedDescription,
      });
    } else {
      addProduct({
        name: trimmedName,
        price: priceValue,
        description: trimmedDescription,
      });
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Назва продукту</Text>
      <TextInput
        style={styles.input}
        placeholder="Наприклад, Ноутбук ProBook"
        placeholderTextColor={colors.textMuted}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Ціна (грн)</Text>
      <TextInput
        style={styles.input}
        placeholder="Наприклад, 12999"
        placeholderTextColor={colors.textMuted}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Опис</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Короткий опис продукту"
        placeholderTextColor={colors.textMuted}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {isEditing ? 'Зберегти зміни' : 'Створити продукт'}
        </Text>
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
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
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
