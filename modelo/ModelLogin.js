import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import forge from 'node-forge';
import base64 from 'base-64';
import Config  from './../config/config';

class ModelLogin extends Config {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.publicKey = null;
    this.requestCounter = 0;
  }
  generarClavePublica() {
    this.requestCounter++;
    const formData = new FormData();
    formData.append('accion', 'generar_llaves_rsa');
    formData.append('counter', this.requestCounter);
  
    return fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 1) {
          console.log(data.message);
          return data.publicKey; // Retornar la clave pública generada
        } else {
          throw new Error('Error al generar claves RSA');
        }
      })
      .catch(error => {
        console.error('Error al generar claves RSA:', error);
        throw error; // Propagar el error para que pueda ser manejado en la función llamadora
      });
  }
  

  async obtenerDatosDeSesion(encryptedTipoBase64, encryptedUserBase64) {
    const formData2 = new FormData();
    formData2.append('accion', 'obtener_datos');
    formData2.append('tipo', encryptedTipoBase64);
    formData2.append('user', encryptedUserBase64);

    try {
      const response = await fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData2,
      });
      const sessionData = await response.text();

      if (sessionData) {
        const sessionObj = JSON.parse(sessionData);
        /* console.log(sessionObj); */
        await AsyncStorage.setItem('userSession', JSON.stringify(sessionObj));
        Alert.alert('Éxito', 'Inicio de sesión exitoso. ¡Bienvenido!', [
          {
            text: 'OK',
            onPress: () => {
              this.navigation.navigate('Pagina Principal');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error al obtener la sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  async IniciarSesion(username, password, selectedRole) {
    try {
      publicKey = require('../RSA/public');
    } catch (error) {
      console.log('La clave pública no existe todavía');
    }
    try {
      if (selectedRole && username && password && publicKey) {
        const rsa = forge.pki.rsa;
        const parsedPublicKey = forge.pki.publicKeyFromPem(publicKey.publicKey);
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

        fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData1,
        })
          .then((response) => response.text())
          .then((text) => {
            try {
              const data = JSON.parse(text);
              /* console.log(data); */
              if (data.estatus == 1) {
                // Llamamos al método obtenerDatosDeSesion para obtener los datos de la sesión
                this.obtenerDatosDeSesion(encryptedTipoBase64, encryptedUserBase64);
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
        Alert.alert('Error', 'Completa todos los campos solicitados antes de iniciar sesión.', [
          {
            text: 'OK',
          },
        ]);
      }
    } catch (error) {
      console.error('Error al cifrar la contraseña:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar cifrar la contraseña. Por favor, inténtalo de nuevo.');
    }
  }
}

export default ModelLogin;
