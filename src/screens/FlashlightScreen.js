import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../theme';

export default function FlashlightScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);

  if (!permission) {
    return <View style={styles.screen} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.screen}>
        <Text style={styles.heading}>Ліхтарик</Text>
        <View style={styles.centerBlock}>
          <Text style={styles.permissionText}>
            Для керування ліхтариком потрібен доступ до камери.
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Надати доступ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Ліхтарик</Text>

      <View style={styles.cameraWrapper}>
        <CameraView style={styles.camera} facing="back" enableTorch={torchOn} />
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusDot, torchOn && styles.statusDotOn]} />
        <Text style={styles.statusText}>
          Статус ліхтаря: {torchOn ? 'увімкнено' : 'вимкнено'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.toggleButton, torchOn && styles.toggleButtonOn]}
        onPress={() => setTorchOn((prev) => !prev)}
      >
        <Text style={styles.toggleButtonText}>
          {torchOn ? 'Вимкнути ліхтарик' : 'Увімкнути ліхтарик'}
        </Text>
      </TouchableOpacity>
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
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cameraWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textMuted,
    marginRight: 8,
  },
  statusDotOn: {
    backgroundColor: colors.warning,
  },
  statusText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  toggleButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButtonOn: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  toggleButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
});
