import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAudioPlayer } from 'expo-audio';
import { colors } from '../theme';

const VIDEO_SOURCE = require('../../assets/videos/hw4_demo.mp4');
const SUCCESS_SOUND = require('../../assets/sounds/success.mp3');

export default function VideoScreen() {
  const [status, setStatus] = useState('idle'); // idle | loading | ready
  const progress = useRef(new Animated.Value(0)).current;
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const player = useVideoPlayer(VIDEO_SOURCE, (p) => {
    p.loop = true;
  });
  const successSound = useAudioPlayer(SUCCESS_SOUND);

  const startLoading = () => {
    setStatus('loading');
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: false,
    }).start(() => {
      successSound.seekTo(0);
      successSound.play();
      setStatus('ready');
      player.play();
    });
  };

  const reset = () => {
    player.pause();
    progress.setValue(0);
    setStatus('idle');
  };

  const handlePress = () => {
    if (status === 'idle') startLoading();
    else if (status === 'ready') reset();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Відео</Text>

      {status !== 'ready' && (
        <View style={styles.centerBlock}>
          <TouchableOpacity
            style={[styles.button, status === 'loading' && styles.buttonDisabled]}
            onPress={handlePress}
            disabled={status === 'loading'}
          >
            <Text style={styles.buttonText}>
              {status === 'loading' ? 'Завантаження...' : 'Включити відео'}
            </Text>
          </TouchableOpacity>

          {status === 'loading' && (
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
          )}
        </View>
      )}

      {status === 'ready' && (
        <View style={styles.videoBlock}>
          <VideoView
            style={styles.video}
            player={player}
            nativeControls
            contentFit="contain"
          />
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>Почати заново</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  progressTrack: {
    width: '80%',
    height: 10,
    backgroundColor: colors.surface,
    borderRadius: 6,
    marginTop: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 6,
  },
  videoBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  resetButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
});
