import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { colors, appInfo } from '../theme';

export default function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>RN</Text>
          </View>
          <Text style={styles.headerTitle}>{appInfo.name}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>{appInfo.name}</Text>
        <Text style={styles.footerMeta}>
          {appInfo.year} · v{appInfo.version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  footerTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  footerMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
