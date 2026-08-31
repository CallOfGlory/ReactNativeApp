import { View, Text, StyleSheet } from 'react-native';
import { getAvatarById } from '../data/characterOptions';

export default function AvatarBadge({ avatarId, size = 56 }) {
  const avatar = getAvatarById(avatarId);
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatar.bg,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>{avatar.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
