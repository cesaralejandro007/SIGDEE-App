import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { PieChart } from 'react-native-chart-kit';
import EstudiantesUbicacion from '../modelo/ModelReporteEstudiantesUbicacion';

const Estudiant_ubicac = new EstudiantesUbicacion();

const ModelReporteEstudiantesUbicacionScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Estudiant_ubicac.fetchListadoPaises();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Estudiant_ubicac]);

  const handlePaisesChange = async (option) => {
    try {
      setIsLoading(true);
      Estudiant_ubicac.setSelectedPais(option);
      await Estudiant_ubicac.fetchEstadosChange(option);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEstadosChange = async (option) => {
    try {
      setIsLoading(true);
      Estudiant_ubicac.setSelectedEstados(option);
      const data = await Estudiant_ubicac.fetchBuscar_direcciones(option);
  
      // Map the fetched data and assign colors to each slice
      const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33D1', '#33D1FF'];
      const chartDataWithColors = data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length], // Cycle through colors if more slices than colors
      }));
  
      setChartData(chartDataWithColors);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Pais:</Text>
        <ModalSelector
          data={Estudiant_ubicac.Paises.map(pais => ({ key: pais.value, label: pais.text }))}
          initValue={Estudiant_ubicac.selectedPaisText}
          onChange={handlePaisesChange}
          disabled={isLoading}
        />
      </View>

      {Estudiant_ubicac.selectedPais && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Estado:</Text>
          <ModalSelector
            data={Estudiant_ubicac.Estados.map(Estados => ({ key: Estados.value, label: Estados.text }))}
            initValue={Estudiant_ubicac.selectedEstadosText}
            onChange={handleEstadosChange}
            disabled={isLoading}
          />
        </View>
      )}

      {chartData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Reporte Estadistico de Estudiantes por Emprendimiento:</Text>
          <PieChart
            data={chartData}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="y"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      )}

      {/* Resto del código... */}
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
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Otros estilos...
});

export default ModelReporteEstudiantesUbicacionScreen;
