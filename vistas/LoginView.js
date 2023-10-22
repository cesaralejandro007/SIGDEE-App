import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import { useNavigation } from '@react-navigation/native';
import ModelLogin from './modelo/ModelLogin';

export default function App() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const Login = new ModelLogin({ navigation });
  
  useEffect(() => {
    Login.generateRSAKeys();
  }, []);

  const handleLogin = async () => {
    Login.login(username, password, selectedRole);
  }

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
            { label: 'Estudiante', key: 'Estudiante' },
          ]}
          initValue={`Selecciona un rol`}
          onChange={(item) => setSelectedRole(item)}
          style={styles.selector}
          selectStyle={styles.select}
          optionStyle={styles.option}
          optionTextStyle={styles.optionText}
        />
        <Text style={styles.label}>Rol seleccionado: {selectedRole ? selectedRole.label : ''}</Text>
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  option: {
    color: 'textBlack',
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonG: {
    width: 130,
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  buttonTextG: {
    color: 'white',
    textAlign: 'center',
  },
});
