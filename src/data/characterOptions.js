export const CLASSES = ['Воїн', 'Маг', 'Лучник', 'Танк', 'Жрець', 'Розбійник'];

export const AVATARS = [
  { id: 'warrior', emoji: '⚔️', bg: '#7F1D1D' },
  { id: 'mage', emoji: '🧙', bg: '#4C1D95' },
  { id: 'archer', emoji: '🏹', bg: '#166534' },
  { id: 'tank', emoji: '🛡️', bg: '#374151' },
  { id: 'priest', emoji: '✨', bg: '#B45309' },
  { id: 'rogue', emoji: '🗡️', bg: '#1F2937' },
  { id: 'dragon', emoji: '🐉', bg: '#065F46' },
  { id: 'knight', emoji: '🐎', bg: '#1E3A8A' },
  { id: 'wizardCat', emoji: '🐱', bg: '#9D174D' },
  { id: 'skull', emoji: '💀', bg: '#111827' },
  { id: 'phoenix', emoji: '🔥', bg: '#9A3412' },
  { id: 'ice', emoji: '❄️', bg: '#075985' },
];

export const getAvatarById = (id) => AVATARS.find((avatar) => avatar.id === id) || AVATARS[0];
