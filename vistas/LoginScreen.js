import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import { useNavigation } from '@react-navigation/native';

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
  
    fetch('http://192.168.250.4/dashboard/www/SIGDEE/?pagina=Y0NHU1BSU1JucU01cVVwWk05NmRCZz09', {
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

            Alert.alert('Éxito', data.message, [
              {
                text: 'OK',
                onPress: () => {
                  // Redirige a la pantalla "Home" después del inicio de sesión exitoso
                  navigation.navigate('Pagina Principal');
                },
              },
            ]);

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
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color="black"
            style={styles.eyeIcon}
            onPress={toggleShowPassword}
          />
        </View>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
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
  },
});
