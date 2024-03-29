import AsyncStorage from '@react-native-async-storage/async-storage';
import Config  from './../config/config';

class ModelProfile extends Config {

  constructor() {
    super();
    this.id = null;
    this.editedEmail = null;
    this.editedTelefono = null;
  }

  async getDatosUsuario() {
    const session = await AsyncStorage.getItem('userSession');

    if (session !== null) {
      const dato = JSON.parse(session);
      this.id = dato[0].id;
      this.editedEmail = null;
      this.editedTelefono = null; 
      return {
        id: dato[0].id,
        cedula: dato[0].cedula,
        nombre: dato[0].nombre,
        apellido: dato[0].apellido,
        nombreUsuario: dato[0].nombreusuario,
        correo: dato[0].correo,
        telefono: dato[0].telefono,
      };
    } else {
      return null;
    }
  }

  async actualizarPerfil(id, editedEmail, editedTelefono) {
    this.editedEmail = editedEmail;
    this.editedTelefono = editedTelefono;
    const formData = new FormData();
    formData.append('accion', 'modificarperfil');
    formData.append('id', id);
    formData.append('correo', this.editedEmail);
    formData.append('telefono', this.editedTelefono);

    const response = await fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=NWY0U0dmUXFHUEsvTTkzV3pQV081QT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message };
    }

    const data = await response.json();
    if (data.estatus == 1) {
      /* console.log(data); */
      return { success: data.message };
    } else {
      return { error: data.message };
    }
  }
}

export default ModelProfile;
