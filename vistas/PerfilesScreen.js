import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [id, setId] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
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

          const nombre = dato[0].nombre ? dato[0].nombre : '';
          const apellido = dato[0].apellido ? dato[0].apellido : '';

          const primerValorN = nombre.split(' ')[0];
          const primerValorA = apellido.split(' ')[0];

          const nombre_apellido = primerValorN + ' ' + primerValorA;

          setCedula(dato[0].cedula);
          setNombre(dato[0].nombre);
          setApellido(dato[0].apellido);
          setNombreUsuario(nombre_apellido);
          setRol(dato[0].nombreusuario);
          setEmail(dato[0].correo);
          setTelefono(dato[0].telefono);
          setId(dato[0].id);
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

  const guardarCambios = async () => {
    try {
      // Actualiza el estado con los nuevos valores de correo y teléfono
      setEmail(editedEmail);
      setTelefono(editedTelefono);

      const formData = new FormData();
      formData.append('accion', 'modificarperfil');
      formData.append('id', id);
      formData.append('correo', editedEmail);
      formData.append('telefono', editedTelefono);

      // Realiza la solicitud para modificar el perfil
      const response = await fetch(
        'http://192.168.250.2/dashboard/www/SIGDEE/?pagina=NWY0U0dmUXFHUEsvTTkzV3pQV081QT09',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
        
      if (!response.ok) {
        // Si hay un error en la solicitud, muestra un mensaje de error
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();

      if (data.estatus == 1) {
        const newData = {
          id: id,
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          nombreusuario: rol,
          correo: editedEmail,
          telefono: editedTelefono,
        };
        await AsyncStorage.setItem('userSession', JSON.stringify([newData]));
        Alert.alert('Éxito', data.message);
        setModalVisible(false);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Alert.alert(
        'Error',
        'No se pudieron guardar los cambios. Por favor, inténtelo de nuevo más tarde.'
      );
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
            <Text style={styles.cellValue}>
              {nombreUsuario ? nombreUsuario : ''}
            </Text>
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
    backgroundColor: 'blue', // Cambia el color de fondo aquí
    borderRadius: 5,
    padding: 10,
  },
  buttonTextG: {
    color: 'white', // Cambia el color del texto aquí
    textAlign: 'center',
  },
  buttonC: {
    backgroundColor: 'red', // Cambia el color de fondo aquí
    borderRadius: 5,
    padding: 10,
  },
  buttonTextC: {
    color: 'white', // Cambia el color del texto aquí
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

export default ProfileScreen;
