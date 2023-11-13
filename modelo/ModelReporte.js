// ModelReporte.js

import { Alert } from 'react-native';
import IP from './../config/config';

class ModelReporte {
  constructor() {
    this.areasEmprendimiento = [];
    this.emprendimientos = [];
    this.cursos = [];
    this.selectedArea = null;
    this.selectedEmprendimiento = null;
    this.selectedCurso = null;
    this.tableHead = [];
    this.tableData = [];
    this.selectedAreaText = "Selecciona una opción";
    this.selectedEmprendimientoText = "Selecciona una opción";
    this.selectedCursoText = "Selecciona una opción";
  }

  async fetchAreasEmprendimiento() {
    try {
      const formData1 = new FormData();
      formData1.append('accion', 'listadoareas_app');
      const response = await fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData1,
      });
      const data = await response.json();
      const areas = data.datos || [];
      this.setAreasEmprendimiento(areas);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  }

  async fetchEmprendimientos(datos) {
    try {
      const formData2 = new FormData();
      formData2.append('accion', 'listadoemprendimientos_app');
      formData2.append('area', datos.key);
      const response = await fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData2,
      });
      const data = await response.json();
      this.setEmprendimientos(data.datos);
      return data.datos;
    } catch (error) {
      console.error('Error fetching emprendimientos:', error);
      throw error;
    }
  }

  async fetchCursos(datos) {
    try {
      const formData3 = new FormData();
      formData3.append('accion', 'listadoaulas_app');
      formData3.append('area', this.selectedArea);
      formData3.append('emprendimiento', datos.key);
      const response = await fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData3,
      });
      const data = await response.json();
      this.setCursos(data.datos);
      return data.datos;
    } catch (error) {
      console.error('Error fetching cursos:', error);
      throw error;
    }
  }

  async fetchNotasAulas(datos) {
    try {
      const formData4 = new FormData();
      formData4.append('accion', 'consulta_aprobados_reprobados');
      formData4.append('aula', datos.key);
      const response = await fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData4,
      });
      const data = await response.json();
      const head = data.head;
      this.setTableHead(head);

      if (Object.keys(data.estudiantes).length === 0) {
        Alert.alert('Error', 'No existe cursos');
      } else {
        const tableData = data.estudiantes.map((estudiante) => [
          estudiante.cedula,
          estudiante.nombres,
          ...estudiante.notas
        ]);
        this.setTableData(tableData);
      }
    } catch (error) {
      console.error('Error fetching notas:', error);
    }
  }

  setAreasEmprendimiento(data) {
    this.areasEmprendimiento = data;
  }

  setEmprendimientos(data) {
    this.emprendimientos = data;
  }

  setCursos(data) {
    this.cursos = data;
  }

  setSelectedArea(option) {
    this.selectedArea = option.key;
    this.selectedAreaText = option.label;
  }

  setSelectedEmprendimiento(option) {
    this.selectedEmprendimiento = option.key;
    this.selectedEmprendimientoText = option.label;
  }

  setSelectedCurso(option) {
    this.selectedCurso = option.key;
    this.selectedCursoText = option.label;
  }

  setTableHead(head) {
    this.tableHead = head;
  }

  setTableData(data) {
    this.tableData = data;
  }
}

export default ModelReporte;
