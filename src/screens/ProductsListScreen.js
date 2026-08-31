import { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useProducts } from '../context/ProductsContext';
import { colors } from '../theme';

function formatPrice(price) {
  return `${price.toLocaleString('uk-UA')} грн`;
}

function ProductRow({ product, onEdit, onSoftDelete, onRestore, onHardDelete }) {
  const isDeleted = !!product.deletedAt;

  const confirmHardDelete = () => {
    Alert.alert(
      'Видалити назавжди?',
      `Продукт "${product.name}" буде видалено без можливості відновлення.`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: () => onHardDelete(product.id) },
      ]
    );
  };

  return (
    <View style={[styles.row, isDeleted && styles.rowDeleted]}>
      <View style={styles.rowInfo}>
        <Text style={[styles.rowName, isDeleted && styles.textMuted]}>
          {product.name}
        </Text>
        <Text style={[styles.rowDescription, isDeleted && styles.textMuted]} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.rowPrice}>{formatPrice(product.price)}</Text>
        {isDeleted && <Text style={styles.deletedLabel}>Видалено</Text>}
      </View>

      <View style={styles.actions}>
        {!isDeleted && (
          <>
            <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(product)}>
              <Text style={styles.actionButtonText}>Редагувати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.softDeleteButton]}
              onPress={() => onSoftDelete(product.id)}
            >
              <Text style={styles.actionButtonText}>Видалити</Text>
            </TouchableOpacity>
          </>
        )}
        {isDeleted && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.restoreButton]}
              onPress={() => onRestore(product.id)}
            >
              <Text style={styles.actionButtonText}>Відновити</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.hardDeleteButton]}
              onPress={confirmHardDelete}
            >
              <Text style={styles.actionButtonText}>Видалити назавжди</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

export default function ProductsListScreen({ navigation }) {
  const { products, softDeleteProduct, restoreProduct, hardDeleteProduct } = useProducts();
  const [showDeleted, setShowDeleted] = useState(false);

  const visibleProducts = useMemo(
    () => products.filter((product) => showDeleted || !product.deletedAt),
    [products, showDeleted]
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Продукти</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate('ProductForm')}
        >
          <Text style={styles.newButtonText}>+ Новий</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setShowDeleted((prev) => !prev)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, showDeleted && styles.checkboxChecked]}>
          {showDeleted && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Показати видалені продукти</Text>
      </TouchableOpacity>

      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Продуктів ще немає</Text>}
        renderItem={({ item }) => (
          <ProductRow
            product={item}
            onEdit={(product) => navigation.navigate('ProductForm', { productId: product.id })}
            onSoftDelete={softDeleteProduct}
            onRestore={restoreProduct}
            onHardDelete={hardDeleteProduct}
          />
        )}
      />
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    color: colors.text,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  rowDeleted: {
    opacity: 0.65,
    borderStyle: 'dashed',
  },
  rowInfo: {
    marginBottom: 10,
  },
  rowName: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  rowDescription: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  rowPrice: {
    color: colors.warning,
    fontWeight: '700',
    marginTop: 6,
  },
  textMuted: {
    color: colors.textMuted,
  },
  deletedLabel: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  softDeleteButton: {
    backgroundColor: colors.danger,
  },
  restoreButton: {
    backgroundColor: colors.success,
  },
  hardDeleteButton: {
    backgroundColor: '#7A1F1F',
  },
});
