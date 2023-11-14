// ReporteScreen.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Text } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import ModelReporte from './../modelo/ModelReporte';

const Notas = new ModelReporte();

const ReporteScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      // Esperar a que se carguen las áreas
      setIsLoading(true);
      await Notas.fetchAreasEmprendimiento();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Notas]);

  const handleAreaChange = async (option) => {
    try {
      Notas.setSelectedArea(option);
      setIsLoading(true);
      
      // Cargar emprendimientos después de seleccionar un área
      await Notas.fetchEmprendimientos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmprendimientoChange = async (option) => {
    try {
      Notas.setSelectedEmprendimiento(option);
      setIsLoading(true);

      // Cargar cursos después de seleccionar un emprendimiento
      await Notas.fetchCursos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCursoChange = async (option) => {
    try {
      Notas.setSelectedCurso(option);
      setIsLoading(true);

      // Cargar notas después de seleccionar un curso
      await Notas.fetchNotasAulas(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Área de Emprendimiento:</Text>
        <ModalSelector
          data={Notas.areasEmprendimiento.map(area => ({ key: area.value, label: area.text }))}
          initValue={Notas.selectedAreaText}
          onChange={handleAreaChange}
          disabled={isLoading}
        />
      </View>

      {Notas.selectedArea && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Emprendimiento:</Text>
          <ModalSelector
            data={Notas.emprendimientos.map(emprendimiento => ({ key: emprendimiento.value, label: emprendimiento.text }))}
            initValue={Notas.selectedEmprendimientoText}
            onChange={handleEmprendimientoChange}
            disabled={isLoading}
          />
        </View>
      )}

{Notas.selectedEmprendimiento && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Curso:</Text>
          <ModalSelector
            data={Notas.cursos.map(curso => ({ key: curso.value, label: curso.text }))}
            initValue={Notas.selectedCursoText}
            onChange={handleCursoChange}
            disabled={isLoading}
          />
        </View>
      )}

{Notas.tableData.length > 0 && (
  <View style={styles.tableContainer}>
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={Notas.tableHead} style={styles.head} textStyle={styles.text} />
      <Rows
        data={Notas.tableData}
        textStyle={styles.text}
        style={styles.row}
        render={(rowData, index) => (
          <Cell
            key={index}
            data={rowData}
            textStyle={styles.cellText}
            style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          />
        )}
      />
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
    row: { height: 30 },
  evenRow: { backgroundColor: '#F3F7F9' },
  oddRow: { backgroundColor: 'white' },
  cellText: { margin: 6 },
});

export default ReporteScreen;
