import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [id, setId] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [Email, setEmail] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedTelefono, setEditedTelefono] = useState('');

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
          setId(dato[0].id);
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
        console.error('Error al obtener el dato compartido:', error);
      }
    }

    obtenerNombreUsuario();
  }, []);

  const guardarCambios = async () => {
    // Actualiza el estado con los nuevos valores de correo y teléfono
    setEmail(editedEmail);
    setTelefono(editedTelefono);

    // Aquí puedes implementar la lógica para guardar los cambios en AsyncStorage
    try {
      const newData = {
        cedula: cedula,
        nombre: nombreUsuario,
        rol: rol,
        correo: editedEmail,
        telefono: editedTelefono,
      };

      await AsyncStorage.setItem('userSession', JSON.stringify([newData]));

      // Notifica al usuario que los cambios se han guardado correctamente

      const formData = new FormData();
      formData.append('accion', 'editarperfil');
      formData.append('id', id);
      formData.append('correo', editedEmail);
      formData.append('telefono', editedTelefono);
        // El inicio de sesión fue exitoso
    // Ahora solicita los datos de la sesión
      fetch('http://192.168.0.131/dashboard/www/SIGDEE/?pagina=NWY0U0dmUXFHUEsvTTkzV3pQV081QT09', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((response) => response.text())
        .then((text) => {
          console.log(text)
          if (data.estatus == 1){
  
            Alert.alert('Éxito', data.message);
  
          }else {
            Alert.alert('Error', data.message);
          }
        })
        .catch((error) => {
          console.error('Error al obtener la sesión:', error);
        });
  
      // Cierra el modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
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
        <Button title="Editar Perfil" onPress={() => setModalVisible(true)} />
      </View>

      {/* Modal para editar correo y teléfono */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text>Editar Correo y Teléfono</Text>
          <Text>Correo:</Text>
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
          />
          <Text>Teléfono:</Text>
          <TextInput
            style={styles.input}
            value={editedTelefono}
            onChangeText={setEditedTelefono}
          />

          <Button title="Guardar Cambios" onPress={guardarCambios} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
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
});

export default ProfileScreen;
