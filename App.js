import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus componentes de pantalla aquí
import LoginScreen from './vistas/LoginScreen';
import HomeScreen from './vistas/HomeScreen';
import PerfilesScreen from './vistas/PerfilesScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio de Sesion">
        <Stack.Screen name="Inicio de Sesion" component={LoginScreen} />
        <Stack.Screen name="Pagina Principal" component={HomeScreen} />
        <Stack.Screen name="Perfil de Usuario" component={PerfilesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
