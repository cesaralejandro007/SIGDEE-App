import IP from '../config/config';

class ModelReporteEstudianteEmprendimiento {
  constructor() {
    this.areasEmprendimiento = [];
    this.selectedAreaText = "Selecciona una opción";
    this.reportData = [];
  }

  fetchAreasEmprendimiento() {
    const formData1 = new FormData();
    formData1.append('accion', 'listadoareas_app');
    
    return fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=WGpGMXNRNFJkS3lWek1sVEprem10OU45M0ZjbWs4dCtZUHZlV2xWYkZhMEJFVnVPbGRxZjJoZ1NKVWZOVkRaTg==`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData1,
    })
    .then(response => response.json())
    .then(data => {
      const areas = data.datos || [];
      this.setAreasEmprendimiento(areas);
    })
    .catch(error => {
      console.error('Error fetching areas:', error);
    });
  }

  reporte_estudiante_emprendimiento(datos) {
    const formData2 = new FormData();
    formData2.append('accion', 'reporte_estudiante_emprendimiento');
    formData2.append('area', datos.key);

    return fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=WGpGMXNRNFJkS3lWek1sVEprem10OU45M0ZjbWs4dCtZUHZlV2xWYkZhMEJFVnVPbGRxZjJoZ1NKVWZOVkRaTg==`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData2,
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.datos) {
        this.setReportData(data.datos);
      } else {
        console.warn('Data is undefined in the response.');
      }
      return data;
    })
    .catch(error => {
      console.error('Error fetching emprendimientos:', error);
      throw error;
    });
  }

  setAreasEmprendimiento(data) {
    this.areasEmprendimiento = data;
  }

  setReportData(data) {
    if (data && data.datos) {
      this.reportData = data.datos;
    }
  }

  setSelectedArea(option) {
    this.selectedArea = option.key;
    this.selectedAreaText = option.label;
  }
}

export default ModelReporteEstudianteEmprendimiento;
