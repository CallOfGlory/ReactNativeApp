export const VIDEO_FEED = [
  {
    id: '1',
    title: 'Kittens Compilation',
    date: '2026-08-12',
    thumbnail: require('../../assets/thumbnails/feed_1.jpg'),
    source: require('../../assets/videos/feed_1.mp4'),
  },
  {
    id: '2',
    title: 'Nature Walk 4K',
    date: '2026-08-20',
    thumbnail: require('../../assets/thumbnails/feed_2.jpg'),
    source: require('../../assets/videos/feed_2.mp4'),
  },
  {
    id: '3',
    title: 'Cooking Basics EP1',
    date: '2026-08-25',
    thumbnail: require('../../assets/thumbnails/feed_3.jpg'),
    source: require('../../assets/videos/feed_3.mp4'),
  },
  {
    id: '4',
    title: 'Space Documentary',
    date: '2026-08-29',
    thumbnail: require('../../assets/thumbnails/feed_4.jpg'),
    source: require('../../assets/videos/feed_4.mp4'),
  },
];

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
