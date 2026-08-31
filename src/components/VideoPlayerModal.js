import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import { colors } from '../theme';
import { formatDate } from '../data/videoFeed';

export default function VideoPlayerModal({ video, visible, onClose }) {
  const [isLandscape, setIsLandscape] = useState(false);

  const player = useVideoPlayer(video ? video.source : null, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    if (!visible) return undefined;

    ScreenOrientation.unlockAsync();
    player.play();

    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      const orientation = event.orientationInfo.orientation;
      const landscape =
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
      setIsLandscape(landscape);
    });

    return () => {
      subscription.remove();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setIsLandscape(false);
      player.pause();
    };
  }, [visible, video]);

  const handleClose = () => {
    onClose();
  };

  if (!video) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {isLandscape ? (
          <VideoView
            style={styles.fullscreenVideo}
            player={player}
            nativeControls
            contentFit="contain"
          />
        ) : (
          <SafeAreaView style={styles.portraitContainer} edges={['top']}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Закрити ✕</Text>
            </TouchableOpacity>

            <VideoView
              style={styles.portraitVideo}
              player={player}
              nativeControls
              contentFit="contain"
            />

            <View style={styles.info}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.date}>{formatDate(video.date)}</Text>
              <Text style={styles.hint}>
                Поверніть телефон горизонтально, щоб розгорнути відео на весь екран
              </Text>
            </View>
          </SafeAreaView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  portraitContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
  portraitVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  fullscreenVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  date: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 16,
    fontStyle: 'italic',
  },
});
