import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Text } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import IP from './../config/config';
const ReporteScreen = ({ navigation }) => {
  const [areasEmprendimiento, setAreasEmprendimiento] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedAreaText, setSelectedAreaText] = useState("Selecciona una opción");
  const [selectedEmprendimientoText, setSelectedEmprendimientoText] = useState("Selecciona una opción");
  const [selectedCursoText, setSelectedCursoText] = useState("Selecciona una opción");
  useEffect(() => {

    fetchAreasEmprendimiento();
  }, []);

  const fetchAreasEmprendimiento = () => {
    const formData1 = new FormData();
    formData1.append('accion', 'listadoareas_app');
    fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData1,
    })
      .then((response) => response.json())
      .then((data) => {
        setAreasEmprendimiento(data.datos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchEmprendimientos = (datos) => {
    const formData2 = new FormData();
    formData2.append('accion', 'listadoemprendimientos_app');
    formData2.append('area', datos.key);
    fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData2,
    })
      .then((response) => response.json())
      .then((data) => {
        setEmprendimientos(data.datos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchCursos = (datos) => {

    const formData3 = new FormData();
    formData3.append('accion', 'listadoaulas_app');
    formData3.append('area', selectedArea);
    formData3.append('emprendimiento',datos.key);
    fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData3,
    })
      .then((response) => response.json())
      .then((data) => {
        setCursos(data.datos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchNotasAulas = (datos) => {

    const formData4 = new FormData();
    formData4.append('accion', 'consulta_aprobados_reprobados');
    formData4.append('aula', datos.key);
    fetch(`http://${IP}/dashboard/www/SIGDEE/?pagina=VnhadFd4cTllSFd4akZ6NDRqNXlsUT09`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData4,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      const head = ['Cedula', 'Nombres', 'Lo que has aprendido', 'Evaluacion'];
      setTableHead(head);
      const tableData = data.estudiantes.map((estudiante) => [
        estudiante.cedula,
        estudiante.nombres,
        estudiante.notas[0],
        estudiante.notas[1]
      ]);
      setTableData(tableData);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleAreaChange = (option) => {
    setSelectedArea(option.key);
    setSelectedAreaText(option.label);
    // Cargar emprendimientos basados en el área seleccionada
    fetchEmprendimientos(option);
    // Limpiar selecciones de emprendimiento y curso
    setSelectedEmprendimiento(null);
    setSelectedCurso(null);
  };

  const handleEmprendimientoChange = (option) => {
    setSelectedEmprendimiento(option.key);
    setSelectedEmprendimientoText(option.label);
    // Cargar cursos basados en el emprendimiento seleccionado
    fetchCursos(option);
    // Limpiar selección de curso
    setSelectedCurso(null);
  };

  const handleCursoChange = (option) => {
    setSelectedCurso(option.key);
    setSelectedCursoText(option.label);
    fetchNotasAulas(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Área de Emprendimiento:</Text>
        <ModalSelector
          data={areasEmprendimiento.map(area => ({ key: area.value, label: area.text }))}
          initValue={selectedAreaText}
          onChange={handleAreaChange}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Emprendimiento:</Text>
        <ModalSelector
          data={emprendimientos.map(emprendimiento => ({ key: emprendimiento.value, label: emprendimiento.text }))}
          initValue={selectedEmprendimientoText}
          onChange={handleEmprendimientoChange}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Curso:</Text>
        <ModalSelector
          data={cursos.map(curso => ({ key: curso.value, label: curso.text }))}
          initValue={selectedCursoText}
          onChange={handleCursoChange}
        />
      </View>

      {tableData.length > 0 && (
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  head: { height: 40, backgroundColor: '#808B97' },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: { 
    margin: 6, 
  },
});
export default ReporteScreen;
