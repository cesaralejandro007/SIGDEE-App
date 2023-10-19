import React, { Component } from 'react';
import LoginView from './../../vistas/LoginView'; // Importa la vista
import AsyncStorage from '@react-native-async-storage/async-storage';
import forge from 'node-forge';
import base64 from 'base-64';
import IP from './../../config/config';

class LoginModel extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          username: '',
          password: '',
          showPassword: false,
          selectedRole: { label: 'Selecciona un rol', key: '' }, // Valor por defecto
          requestCounter: 0,
          ClavePublic: null,
        };
      }
      
  // Maneja el cambio de rol seleccionado
  onRoleChange = (item) => {
    this.setState({ selectedRole: item });
  }

  // Maneja el cambio en el campo de nombre de usuario
  onUsernameChange = (text) => {
    this.setState({ username: text });
  }

  // Maneja el cambio en el campo de contraseña
  onPasswordChange = (text) => {
    this.setState({ password: text });
  }

  // Muestra u oculta la contraseña
  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  // Maneja el proceso de inicio de sesión
handleLogin = async () => {
    let publicKey;
    try {
      ({ publicKey } = require('./../../RSA/public'));
      this.setState({ ClavePublic: publicKey });
    } catch (error) {
      console.error('Error al importar publicKey:', error);
    }
    try {
      const { selectedRole, username, password, ClavePublic } = this.state;
      if (selectedRole && username && password && ClavePublic) {
        const rsa = forge.pki.rsa;
        const parsedPublicKey = forge.pki.publicKeyFromPem(ClavePublic);
        const encryptedtipo = parsedPublicKey.encrypt(selectedRole.key);
        const encrypteduser = parsedPublicKey.encrypt(username);
        const encryptedPassword = parsedPublicKey.encrypt(password);
        const encryptedTipoBase64 = base64.encode(encryptedtipo);
        const encryptedUserBase64 = base64.encode(encrypteduser);
        const encryptedPasswordBase64 = base64.encode(encryptedPassword);
  
        const formData1 = new FormData();
        formData1.append('accion', 'ingresar');
        formData1.append('tipo', encryptedTipoBase64);
        formData1.append('user', encryptedUserBase64);
        formData1.append('password', encryptedPasswordBase64);
  
        fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData1,
        })
          .then((response) => response.text())
          .then((text) => {
            console.log(text);
            try {
              const data = JSON.parse(text);
              if (data.estatus == 1) {
                const formData2 = new FormData();
                formData2.append('accion', 'obtener_datos');
                formData2.append('tipo', encryptedTipoBase64);
                formData2.append('user', encryptedUserBase64);
  
                fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  body: formData2,
                })
                  .then((response) => response.text())
                  .then((sessionData) => {
                    if (sessionData) {
                      const sessionObj = JSON.parse(sessionData);
                      AsyncStorage.setItem('userSession', JSON.stringify(sessionObj))
                        .then(() => {
                          Alert.alert('Éxito', data.message, [
                            {
                              text: 'OK',
                              onPress: () => {
                                this.props.navigation.navigate('Pagina Principal');
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
      } else {
        Alert.alert('Error', 'Complete los campos solicitados.', [
          {
            text: 'OK',
          },
        ]);
      }
    } catch (error) {
      console.error('Error al cifrar la contraseña:', error);
    }
  };
  

  render() {
      const selectedRole = this.state.selectedRole || { label: '', key: '' };
    return (
      <LoginView
        selectedRole={selectedRole}
        username={this.state.username}
        password={this.state.password}
        showPassword={this.state.showPassword}
        handleLogin={this.handleLogin}
        toggleShowPassword={this.toggleShowPassword}
        onRoleChange={this.onRoleChange}
        onUsernameChange={this.onUsernameChange}
        onPasswordChange={this.onPasswordChange}
      />
    );
  }
}

export default LoginModel;
