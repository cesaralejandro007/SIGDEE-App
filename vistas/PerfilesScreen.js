// ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
{/*         <Image source={require('./assets/icon.png')} style={styles.profileImage} /> */}
      </TouchableOpacity>
      <Text style={styles.name}>Nombre: John Doe</Text>
      <Text style={styles.email}>Email: johndoe@example.com</Text>
      <Button title="Editar Perfil" onPress={() => {/* Lógica para editar perfil */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
