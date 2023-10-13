import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, IconButton } from 'react-native-paper';
import { styles } from './../assets/css/HomeCss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AulaScreen = ({ navigation }) => {

  const [nombreUsuario, setNombreUsuario] = useState(null);

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

          const nombre_apellido = primerValorN + " " + primerValorA;

          setNombreUsuario(nombre_apellido);
        } else {
          // Salir del sistema
            navigation.navigate('Inicio de Sesion');
        }
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la operación AsyncStorage
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
            // Aquí puedes agregar cualquier lógica adicional antes de salir
            navigation.navigate('Inicio de Sesion');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de Aplicaciones (AppBar) */}
      <Appbar.Header style={styles.Header1}>
        <Appbar.Action color="white" icon="menu" onPress={() => console.log('Abrir menú')} />
        <Appbar.Content titleStyle={{ color: 'white' }}  title={`¡Bienvenido/a de nuevo, ${nombreUsuario ? nombreUsuario : ''} 👋`}/>
      </Appbar.Header>

      <View style={styles.content}>
        <Text>Contenido principal de la págin</Text>
      </View>

      {/* Botones con iconos */}
      <View style={styles.buttons}>
        <IconButton
          icon="office-building"
          label="Aulas"
          onPress={() => {
            navigation.navigate('Aula/Curso');
          }}
        />
        <IconButton
          icon="account"
          label="Perfil"
          onPress={() => {
            navigation.navigate('Perfil de Usuario');
          }}
        />
        <IconButton
          icon="bell"
          label="Notificaciones"
          onPress={() => {
            // Agrega aquí la lógica para mostrar notificaciones
          }}
        />
        <IconButton
          icon="exit-to-app"
          label="Salir"
          onPress={confirmExit} // Llama a la función confirmExit al presionar el botón de salida
        />
      </View>
    </View>
  );
};

export default AulaScreen;
