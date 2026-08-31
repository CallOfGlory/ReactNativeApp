import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { ProductsProvider } from '../context/ProductsContext';
import ProductsListScreen from '../screens/ProductsListScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <ProductsProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen
          name="ProductsList"
          component={ProductsListScreen}
          options={{
            title: 'Продукти',
            headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
          }}
        />
        <Stack.Screen
          name="ProductForm"
          component={ProductFormScreen}
          options={({ route }) => ({
            title: route.params?.productId ? 'Редагувати продукт' : 'Новий продукт',
          })}
        />
      </Stack.Navigator>
    </ProductsProvider>
  );
}
