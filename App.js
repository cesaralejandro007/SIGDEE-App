import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ label: 'Usuario', key: 'usuario' });

  const handleLogin = () => {
    if (username === '28055655' && password === 'Diplomado') {
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
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
            { label: 'Super Usuario', key: 'superU' },
            { label: 'Administrador', key: 'admin' },
            { label: 'Docente', key: 'docente' },
            { label: 'Estudiante', key: 'estudiante' }
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
    backgroundColor: '#2E86C1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
