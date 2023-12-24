import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus componentes de pantalla aquí
import ReporteEstudiantesXEmprendientoScreen from './vistas/ReporteEstudiantesXEmprendimiento';
import ReporteNotasScreen from './vistas/ReporteNotasScreen';
import LoginView from './vistas/LoginView';
import HomeScreen from './vistas/HomeScreen';
import PerfilesView from './vistas/PerfilesView';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio de Sesion">
        <Stack.Screen name="Reporte de Estudiantes por Emprendimiento" component={ReporteEstudiantesXEmprendientoScreen} />
        <Stack.Screen name="Notas de los estudiantes" component={ReporteNotasScreen} />
        <Stack.Screen name="Inicio de Sesion" component={LoginView} />
        <Stack.Screen name="Pagina Principal" component={HomeScreen} />
        <Stack.Screen name="Perfil de Usuario" component={PerfilesView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
