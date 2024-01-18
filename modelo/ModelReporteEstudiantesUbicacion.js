import { Alert } from 'react-native';
import Config from '../config/config';

class EstudiantesUbicacion extends Config {
  constructor() {
    super();
    this.Paises = [];
    this.Estados = [];
    this.buscar_direcciones = [];
    this.selectedPais= null;
    this.selectedEstados = null;
    this.selectedCurso = null;
    this.tableHead = [];
    this.tableData = [];
    this.selectedPaisText = "Selecciona una opción";
    this.selectedEstadosText = "Selecciona una opción";
    this.selectedCursoText = "Selecciona una opción";
  }

  fetchListadoPaises() {
    const formData1 = new FormData();
    formData1.append('accion', 'listadopaises_app');
    
    return fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=OXJ2U0tOMlljLzRIVXRyZTRMK3ZtaGVkb2RiMHdBK0Z0azJjeThaNzIrQT0=`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData1,
    })
    .then(response => response.json())
    .then(data => {
      const paises = data.datos || [];
      this.setPaises(paises);
    })
    .catch(error => {
      console.error('Error fetching Paises:', error);
    });
  }

  fetchEstadosChange(datos) {
    const formData2 = new FormData();
    formData2.append('accion', 'listadoestados_app');
    formData2.append('pais', datos.key);

    return fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=OXJ2U0tOMlljLzRIVXRyZTRMK3ZtaGVkb2RiMHdBK0Z0azJjeThaNzIrQT0=`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData2,
    })
    .then(response => response.json())
    .then(data => {
      this.setEstados(data.datos);
      return data.datos;
    })
    .catch(error => {
      console.error('Error fetching Estados:', error);
      throw error;
    });
  }

  fetchBuscar_direcciones(datos) {
  
    const formData3 = new FormData();
    formData3.append('accion', 'buscar_direcciones');
    formData3.append('pais', this.selectedPais);
    formData3.append('estado', datos.key);

    return fetch(`http://${this.getIP()}/dashboard/www/SIGDEE/?pagina=OXJ2U0tOMlljLzRIVXRyZTRMK3ZtaGVkb2RiMHdBK0Z0azJjeThaNzIrQT0=`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData3,
    })
    .then(response => response.json())
    .then(data => {
      this.setdirecciones(data.datos);
      return data.datos;
    })
    .catch(error => {
      console.error('Error fetching Direcciones:', error);
      throw error;
    });
  }


  setPaises(data) {
    this.Paises = data;
  }

  setEstados(data) {
    this.Estados = data;
  }

  setdirecciones(data) {
    this.buscar_direcciones = data;
  }

  setSelectedPais(option) {
    this.selectedPais = option.key;
    this.selectedPaisText = option.label;
  }

  setSelectedEstados(option) {
    this.selectedEstados = option.key;
    this.selectedEstadosText = option.label;
  }
}

export default EstudiantesUbicacion;
