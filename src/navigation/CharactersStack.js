import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { CharactersProvider } from '../context/CharactersContext';
import CharactersListScreen from '../screens/CharactersListScreen';
import CharacterFormScreen from '../screens/CharacterFormScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function CharactersStack() {
  return (
    <CharactersProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{
            title: 'Персонажі',
            headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
          }}
        />
        <Stack.Screen
          name="CharacterForm"
          component={CharacterFormScreen}
          options={{ title: 'Новий персонаж' }}
        />
      </Stack.Navigator>
    </CharactersProvider>
  );
}
