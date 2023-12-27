import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

const HomeScreen = ({ navigation }) => {
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    async function obtenerNombreUsuario() {
      try {
        const session = await AsyncStorage.getItem('userSession');

        if (session !== null) {
          const dato = JSON.parse(session);

          const arreglo = dato[0].nombre.split(' ');
          const primerValorN = arreglo[0];

          const arreglo1 = dato[0].apellido.split(' ');
          const primerValorA = arreglo1[0];

          const nombre_apellido = primerValorN + ' ' + primerValorA;

          setNombreUsuario(nombre_apellido);
        } else {
          navigation.navigate('Inicio de Sesion');
        }
      } catch (error) {
        console.error('Error al obtener el dato compartido:', error);
      }
    }

    obtenerNombreUsuario();
  }, []);

  const confirmExit = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: () => {
            AsyncStorage.clear()
              .then(() => {
                navigation.navigate('Inicio de Sesion');
              })
              .catch((error) => {
                console.error('Error al cerrar sesión:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const menuItems = [
    'Reporte de estudiante por area emprendimiento',
    'Reporte de estudiantes por ubicación',
    'Reporte de las notas de los estudiantes',
    'Perfil',
    'Salir',
  ];

  const iconMapping = {
    'Reporte de estudiante por area emprendimiento': 'insert-chart',
    'Reporte de estudiantes por ubicación': 'insert-chart',
    'Reporte de las notas de los estudiantes': 'insert-chart',
    'Perfil': 'person', // Cambiado de 'account' a 'person'
    'Salir': 'exit-to-app',
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.Header1}>
        <Appbar.Content
          titleStyle={{ color: 'white' }}
          title={`¡Bienvenido/a de nuevo, ${nombreUsuario ? nombreUsuario : ''} 👋`}
        />
      </Appbar.Header>

      <View style={styles.content}>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        {menuItems.map((menuItem, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              {
                backgroundColor: index === menuItems.length - 1 ? '#C0392B' : '#2980B9',
                height: 40, // Ajustar altura
              },
            ]}
            onPress={() => {
              switch (menuItem) {
                case 'Reporte de estudiante por area emprendimiento':
                  navigation.navigate('Reporte de Estudiantes por Emprendimiento');
                  break;
                case 'Reporte de estudiantes por ubicación':
                  navigation.navigate('Reporte de Estudiantes Por Ubicacion');
                  break;
                case 'Reporte de las notas de los estudiantes':
                  navigation.navigate('Notas de los estudiantes');
                  break;
                case 'Perfil':
                  navigation.navigate('Perfil de Usuario');
                  break;
                case 'Salir':
                  confirmExit();
                  break;
                default:
                  break;
              }
            }}
          >
            <MaterialIcons name={iconMapping[menuItem]} size={24} color="white" />
            <Text style={styles.label}>{menuItem}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header1: {
    backgroundColor: '#0D47AD',
  },
  content: {
    margin: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    alignItems: 'stretch', // Alineación ajustada
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  label: {
    color: 'white',
    textAlign: 'center', // Texto centrado
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HomeScreen;
