import { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import VideoPlayerModal from '../components/VideoPlayerModal';
import { VIDEO_FEED, formatDate } from '../data/videoFeed';
import { colors } from '../theme';

export default function YoutubeScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Стрічка відео</Text>

      <FlatList
        data={VIDEO_FEED}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedVideo(item)}
            activeOpacity={0.8}
          >
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <VideoPlayerModal
        video={selectedVideo}
        visible={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
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
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  cardDate: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});
