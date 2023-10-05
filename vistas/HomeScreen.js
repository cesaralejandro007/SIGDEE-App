import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, IconButton } from 'react-native-paper';
import { styles } from './../assets/css/HomeCss';

const HomeScreen = ({ navigation }) => {
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
        <Appbar.Content titleStyle={{ color: 'white' }} title="¡Bienvenido/a de nuevo, Cesar V. 👋" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text>Contenido principal de la página</Text>
      </View>

      {/* Botones con iconos */}
      <View style={styles.buttons}>
        <IconButton
          icon="office-building"
          label="Aulas"
          onPress={() => {
            // Agrega aquí la lógica para mostrar notificaciones
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

export default HomeScreen;
