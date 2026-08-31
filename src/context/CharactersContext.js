import { createContext, useContext, useState } from 'react';

const CharactersContext = createContext(null);

let nextId = 100;

const SEED_CHARACTERS = [
  { id: 1, name: 'Торвальд', className: 'Воїн', power: 82, avatarId: 'warrior' },
  { id: 2, name: 'Елара', className: 'Маг', power: 91, avatarId: 'mage' },
  { id: 3, name: 'Кайла', className: 'Лучник', power: 74, avatarId: 'archer' },
  { id: 4, name: 'Бром', className: 'Танк', power: 88, avatarId: 'tank' },
  { id: 5, name: 'Севелина', className: 'Жрець', power: 65, avatarId: 'priest' },
];

export function CharactersProvider({ children }) {
  const [characters, setCharacters] = useState(SEED_CHARACTERS);

  const addCharacter = ({ name, className, power, avatarId }) => {
    setCharacters((prev) => [
      { id: nextId++, name, className, power, avatarId },
      ...prev,
    ]);
  };

  return (
    <CharactersContext.Provider value={{ characters, addCharacter }}>
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const ctx = useContext(CharactersContext);
  if (!ctx) {
    throw new Error('useCharacters must be used within CharactersProvider');
  }
  return ctx;
}
