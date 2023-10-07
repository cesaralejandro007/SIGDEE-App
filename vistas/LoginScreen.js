import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from './../config/config';
export default function App() {

  const navigation = useNavigation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ label: '', key: '' });
 
 
  const handleLogin = () => {
    const formData = new FormData();
    formData.append('accion', 'ingresar');
    formData.append('tipo', selectedRole.key);
    formData.append('user', username);
    formData.append('password', password);
  
    fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.text()) // Convierte la respuesta a texto
      .then((text) => {
        try {
          const data = JSON.parse(text); // Analiza el texto como JSON
          if (data.estatus == 1) {
                    const formData1 = new FormData();
                    formData1.append('accion', 'obtener_datos');
                    formData1.append('tipo', selectedRole.key);
                    formData1.append('user', username);
                      // El inicio de sesión fue exitoso
                  // Ahora solicita los datos de la sesión
                  fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                    body: formData1,
                  })
                    .then((response) => response.text())
                    .then((sessionData) => {
                      if (sessionData) {
                        const sessionObj = JSON.parse(sessionData);
                                              // Guardar los datos de la sesión en AsyncStorage
                        AsyncStorage.setItem('userSession', JSON.stringify(sessionObj))
                        .then(() => {
                          Alert.alert('Éxito', data.message, [
                            {
                              text: 'OK',
                              onPress: () => {
                                // Redirige a la pantalla "Home" después del inicio de sesión exitoso
                                navigation.navigate('Pagina Principal');
                              },
                            },
                          ]);
                        })
                        .catch((error) => {
                          console.error('Error al guardar la sesión en AsyncStorage:', error);
                        });
                      }
                    })
                    .catch((error) => {
                      console.error('Error al obtener la sesión:', error);
                    });
          } else {
            Alert.alert('Error', data.message);
          }
        } catch (error) {
          console.error('Error al analizar la respuesta JSON:', error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.header}>SIGDEE</Text>
        <ModalSelector
          data={[
            { label: 'Super Usuario', key: 'Super Usuario' },
            { label: 'Administrador', key: 'Administrador' },
            { label: 'Docente', key: 'Docente' },
            { label: 'Estudiante', key: 'Estudiante' }
          ]}
          initValue={`Selecciona un rol`}
          onChange={item => setSelectedRole(item)}
          style={styles.selector} // Estilo para el botón del selector
          selectStyle={styles.select} // Estilo para el cuadro de diálogo del selector
          optionStyle={styles.option} // Estilo para las opciones del selector
          optionTextStyle={styles.optionText} // Estilo para el texto de las opciones
        />
          <Text style={styles.label}>Rol seleccionado: {selectedRole.label}</Text>
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="black"
            style={styles.eyeIcon}
            onPress={toggleShowPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.buttonG}>
            <Text style={styles.buttonTextG}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D47AD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  label: {
    color: '#154360',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  selector: {
    // Estilo para el botón del selector
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  option:{
    color:'textBlack',
  },
  optionText: {
    // Estilo para el texto de las opciones
    fontSize: 16,
  },buttonContainer: {
    alignItems: 'center',
  },buttonG: {
    width: 130,
    backgroundColor: 'blue', // Cambia el color de fondo aquí
    borderRadius: 5,
    padding: 10,
  },
  buttonTextG: {
    color: 'white', // Cambia el color del texto aquí
    textAlign: 'center',
  },
});


