import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const AulaScreen = ({ navigation }) => {
  // Define los botones como una matriz de objetos
  const buttons = [
    {
      title: 'Servicio', // Cambia el título a "Servicio"
      icon: 'account',
      description: 'Descripción del Botón 1',
      onPress: () => console.log('Botón 1 presionado'),
    },
    {
      title: 'Comercialización', // Cambia el título a "Comercialización"
      icon: 'book',
      description: 'Descripción del Botón 2',
      onPress: () => console.log('Botón 2 presionado'),
    },
    // Agrega más botones según sea necesario
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <ListItem
          key={index}
          containerStyle={styles.buttonContainer}
          title={button.title}
          leftIcon={{ name: button.icon, type: 'material-community' }}
          titleStyle={{ color: 'white' }} // Color del texto blanco
          subtitle={button.description}
          subtitleStyle={{ color: 'white' }} // Color del texto blanco
          rightIcon={<Icon name="arrow-right" size={20} color="white" />} // Icono de flecha
          onPress={button.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 5,
    paddingBottom: 25,
    backgroundColor: '#0D47AD', // Fondo azul
  },
});

export default AulaScreen;
