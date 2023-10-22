import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModelProfile from './../modelo/ModelProfile';

const PerfilesView = () => {
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedTelefono, setEditedTelefono] = useState('');
  const modelProfile = new ModelProfile();

  useEffect(() => {
    async function obtenerDatosUsuario() {

      const data = await modelProfile.getUserData();
      if (data) {
        setUserData(data);
      } else {
        AsyncStorage.clear()
        .then(() => {
          // Navegar a la pantalla de inicio de sesión
          navigation.navigate('Inicio de Sesion');
        })
        .catch((error) => {
          console.error('Error al cerrar sesión:', error);
        });
      }
    }

    obtenerDatosUsuario();
  }, []);

  const guardarCambios = async () => {
    const { id } = userData;
    const result = await modelProfile.updateUserProfile(id, editedEmail, editedTelefono);
    if (result.success) {
      const newData = { ...userData, correo: editedEmail, telefono: editedTelefono };
      setUserData(newData);
      setModalVisible(false); // Cierra el modal aquí
      Alert.alert('Éxito', result.success);
    } else {
      // Error: mostrar mensaje de error
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        {/* <Image source={require('./assets/icon.png')} style={styles.profileImage} /> */}
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Cedula:</Text>
            <Text style={styles.cellValue}>{userData ? userData.cedula : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Nombre y apellido:</Text>
            <Text style={styles.cellValue}>
              {userData ? userData.nombreUsuario : ''}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Rol:</Text>
            <Text style={styles.cellValue}>{userData ? userData.nombreUsuario : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Email:</Text>
            <Text style={styles.cellValue}>{userData ? userData.correo : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellLabel}>Telefono:</Text>
            <Text style={styles.cellValue}>{userData ? userData.telefono : ''}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonG}>
          <Text style={styles.buttonTextG}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar correo y teléfono */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.titulo}>Editar Perfil</Text>
          <Text>Correo:</Text>
          <TextInput
            placeholder="Correo:"
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
          />
          <Text>Teléfono:</Text>
          <TextInput
            placeholder="Teléfono:"
            style={styles.input}
            value={editedTelefono}
            onChangeText={setEditedTelefono}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={guardarCambios} style={styles.buttonG}>
              <Text style={styles.buttonTextG}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonC}>
              <Text style={styles.buttonTextC}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: '80%',
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
    marginTop: 20,
  },
  buttonG: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  buttonTextG: {
    color: 'white',
    textAlign: 'center',
  },
  buttonC: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  buttonTextC: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo:{
    padding: 10,
    fontSize: 25
  }
});

export default PerfilesView;
