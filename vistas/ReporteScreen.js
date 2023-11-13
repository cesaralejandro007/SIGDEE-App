// ReporteScreen.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Text } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import IP from './../config/config';
import ModelReporte from './../modelo/ModelReporte';

const ReporteScreen = ({ navigation }) => {
  const [model, setModel] = useState(new ModelReporte());
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      // Esperar a que se carguen las áreas
      setIsLoading(true);
      await model.fetchAreasEmprendimiento();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [model]);

  const handleAreaChange = async (option) => {
    try {
      model.setSelectedArea(option);
      setIsLoading(true);
      
      // Cargar emprendimientos después de seleccionar un área
      await model.fetchEmprendimientos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmprendimientoChange = async (option) => {
    try {
      model.setSelectedEmprendimiento(option);
      setIsLoading(true);

      // Cargar cursos después de seleccionar un emprendimiento
      await model.fetchCursos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCursoChange = async (option) => {
    try {
      model.setSelectedCurso(option);
      setIsLoading(true);

      // Cargar notas después de seleccionar un curso
      await model.fetchNotasAulas(option);
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
          data={model.areasEmprendimiento.map(area => ({ key: area.value, label: area.text }))}
          initValue={model.selectedAreaText}
          onChange={handleAreaChange}
          disabled={isLoading}
        />
      </View>

      {model.selectedArea && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Emprendimiento:</Text>
          <ModalSelector
            data={model.emprendimientos.map(emprendimiento => ({ key: emprendimiento.value, label: emprendimiento.text }))}
            initValue={model.selectedEmprendimientoText}
            onChange={handleEmprendimientoChange}
            disabled={isLoading}
          />
        </View>
      )}

{model.selectedEmprendimiento && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Curso:</Text>
          <ModalSelector
            data={model.cursos.map(curso => ({ key: curso.value, label: curso.text }))}
            initValue={model.selectedCursoText}
            onChange={handleCursoChange}
            disabled={isLoading}
          />
        </View>
      )}

{model.tableData.length > 0 && (
  <View style={styles.tableContainer}>
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={model.tableHead} style={styles.head} textStyle={styles.text} />
      <Rows
        data={model.tableData}
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
