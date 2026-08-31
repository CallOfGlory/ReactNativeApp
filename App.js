import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './src/navigation/CustomDrawerContent';
import CharactersStack from './src/navigation/CharactersStack';
import ProductsStack from './src/navigation/ProductsStack';
import TrafficLightScreen from './src/screens/TrafficLightScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import VideoScreen from './src/screens/VideoScreen';
import YoutubeScreen from './src/screens/YoutubeScreen';
import FlashlightScreen from './src/screens/FlashlightScreen';
import { colors } from './src/theme';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="TrafficLight"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.text,
            drawerActiveBackgroundColor: colors.primary,
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: colors.textMuted,
            drawerStyle: { backgroundColor: colors.surface },
            sceneStyle: { backgroundColor: colors.bg },
          }}
        >
          <Drawer.Screen
            name="TrafficLight"
            component={TrafficLightScreen}
            options={{ title: 'Домашнє завдання 1', drawerLabel: 'Світлофор (ДЗ1)' }}
          />
          <Drawer.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ title: 'Список задач', drawerLabel: 'Список задач (ДЗ2)' }}
          />
          <Drawer.Screen
            name="Characters"
            component={CharactersStack}
            options={{ title: 'Персонажі', drawerLabel: 'Персонажі (ДЗ3)', headerShown: false }}
          />
          <Drawer.Screen
            name="Video"
            component={VideoScreen}
            options={{ title: 'Відео', drawerLabel: 'Відео (ДЗ4)' }}
          />
          <Drawer.Screen
            name="Youtube"
            component={YoutubeScreen}
            options={{ title: 'YouTube', drawerLabel: 'YouTube (ДЗ6)' }}
          />
          <Drawer.Screen
            name="Flashlight"
            component={FlashlightScreen}
            options={{ title: 'Ліхтарик', drawerLabel: 'Ліхтарик (ДЗ7)' }}
          />
          <Drawer.Screen
            name="Products"
            component={ProductsStack}
            options={{ title: 'Продукти', drawerLabel: 'Продукти (ДЗ10)', headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
