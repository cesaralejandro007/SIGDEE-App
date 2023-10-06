import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {

  const [cedula, setCedula] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [Email, setEmail] = useState(null);
  const [telefono, setTelefono] = useState(null);

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

          setCedula(dato[0].cedula);
          setNombreUsuario(nombre_apellido);
          setRol(dato[0].nombreusuario);
          setEmail(dato[0].correo);
          setTelefono(dato[0].telefono);
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


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        {/* <Image source={require('./assets/icon.png')} style={styles.profileImage} /> */}
      </TouchableOpacity>

      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Cedula:</Text>
            <Text style={styles.cellValue}>{cedula ? cedula : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Nombre y apellido:</Text>
            <Text style={styles.cellValue}>{nombreUsuario ? nombreUsuario : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Rol:</Text>
            <Text style={styles.cellValue}>{rol ? rol : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Email:</Text>
            <Text style={styles.cellValue}>{Email ? Email : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Telefono:</Text>
            <Text style={styles.cellValue}>{telefono ? telefono : ''}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Editar Perfil" onPress={() => {/* Lógica para editar perfil */}} />
      </View>
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
  table: {
    width: '80%', // Ajusta el ancho de la tabla según tus necesidades
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
  },
  cellLabel: {
    fontWeight: 'bold',
  },
  cellValue: {},
  buttonContainer: {
    marginTop: 20, // Margen superior para separar el botón de la tabla
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



