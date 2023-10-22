import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import forge from 'node-forge';
import base64 from 'base-64';
import IP from '../../config/config';

class ModelLogin {
  constructor({ navigation }) { // Recibe la propiedad navigation
    this.navigation = navigation; // Asigna la propiedad navigation a la instancia del modelo
    this.publicKey = null;
    this.requestCounter = 0;
  }
  async generateRSAKeys() {
    this.requestCounter++;
    const formData = new FormData();
    formData.append('accion', 'generar_llaves_rsa');
    formData.append('counter', this.requestCounter);

    try {
      const response = await fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const data = await response.json();

      if (data.publicKey) {
        this.publicKey = data.publicKey;
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error al generar claves RSA:', error);
    }
  }

  async login(username, password ,selectedRole) {
    try {
      publicKey = require('../../RSA/public');
    } catch (error) {
      console.log('La clave publica no existe todavia');
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

        fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=U1RWUkk1S0N6RGdoZ3RMZUFFUmpiUT09`, {
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
                                this.navigation.navigate('Pagina Principal');
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
  }
}

export default ModelLogin;