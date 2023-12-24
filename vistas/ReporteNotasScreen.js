import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import ModelReporteNotas from '../modelo/ModelReporteNotas';

const Notas = new ModelReporteNotas();

const ReporteNotasScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
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
      setIsLoading(true);
      Notas.setSelectedArea(option);
      await Notas.fetchEmprendimientos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmprendimientoChange = async (option) => {
    try {
      setIsLoading(true);
      Notas.setSelectedEmprendimiento(option);
      await Notas.fetchCursos(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCursoChange = async (option) => {
    try {
      setIsLoading(true);
      Notas.setSelectedCurso(option);
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
        <ScrollView horizontal>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              {Notas.tableHead.map((head, index) => (
                <View key={index} style={styles.cellHeader}>
                  <Text style={styles.cellText}>{head}</Text>
                </View>
              ))}
            </View>

            {Notas.tableData.map((rowData, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {rowData.map((cellData, cellIndex) => (
                  <View key={cellIndex} style={styles.cell}>
                    <Text style={styles.cellText} numberOfLines={2} ellipsizeMode="tail">
                      {cellData}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
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
    marginBottom: 10,
  },
  label: { fontWeight: 'bold' },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
  },
  cellHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F8FF',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 100, // Ancho fijo de la celda
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 100, // Ancho fijo de la celda
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cellText: {
    textAlign: 'center',
  },
});

export default ReporteNotasScreen;
