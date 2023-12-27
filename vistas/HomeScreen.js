import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const tableData = [['Reporte Area Emprend..','Reporte de Estudiantes Por Ubicacion', 'Notas Estudiantes', 'Perfil', 'Salir']];

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.Header1}>
        <Appbar.Content titleStyle={{ color: 'white' }} title={`¡Bienvenido/a de nuevo, ${nombreUsuario ? nombreUsuario : ''} 👋`} />
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

      <View style={styles.buttons}>
        {tableData[0].map((data, index) => (
          <View style={styles.iconButton} key={index}>
            <IconButton
              icon={data === 'Reporte Area Emprend..' ? 'chart-box' : data === 'Reporte de Estudiantes Por Ubicacion' ? 'chart-box' : data === 'Notas Estudiantes' ? 'chart-box' : data === 'Perfil' ? 'account' : 'exit-to-app'}
              onPress={() => {
                switch (data) {
                  case 'Reporte Area Emprend..':
                    navigation.navigate('Reporte de Estudiantes por Emprendimiento');
                    break;
                  case 'Reporte de Estudiantes Por Ubicacion':
                    navigation.navigate('Reporte de Estudiantes Por Ubicacion');
                    break;
                  case 'Notas Estudiantes':
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
            />
            <Text style={styles.label}>{data}</Text>
          </View>
        ))}
      </View>
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
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconButton: {
    alignItems: 'center',
    margin: 10,
  },
  label: {
    marginTop: 5,
  },
});

export default HomeScreen;
