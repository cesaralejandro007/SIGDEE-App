import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { BarChart } from 'react-native-chart-kit';
import ModelReporteEstudianteEmprendimiento from '../modelo/ModelReporteEstudiantesXEmprendimiento';

const ReportEstudEmprend = new ModelReporteEstudianteEmprendimiento();
const { width: screenWidth } = Dimensions.get('window');

const ReporteEstudiantesXEmprendientoScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartOptions, setChartOptions] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await ReportEstudEmprend.fetchAreasEmprendimiento();
    } catch (error) {
      console.error('Error fetching areas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAreaChange = async (option) => {
    try {
      setIsLoading(true);
      ReportEstudEmprend.setSelectedArea(option);
      const response = await ReportEstudEmprend.reporte_estudiante_emprendimiento(option);

      if (response && response.datos) {
        const total = response.datos.reduce((sum, item) => sum + item.y, 0);
        const categories = response.datos.map(item => item.name);
        const data = response.datos.map(item => (item.y / total) * 100); // Calcula el porcentaje

        const chartOptions = {
          labels: categories,
          datasets: [{
            data: data,
          }],
        };

        setChartOptions(chartOptions);
      } else {
        console.warn('Data is undefined in the response.');
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Área de Emprendimiento:</Text>
        <ModalSelector
          data={ReportEstudEmprend.areasEmprendimiento.map(area => ({ key: area.value, label: area.text }))}
          initValue={ReportEstudEmprend.selectedAreaText}
          onChange={handleAreaChange}
          disabled={isLoading}
        />
      </View>

      <ScrollView horizontal>
        {chartOptions && (
          <BarChart
            style={styles.chart}
            data={chartOptions}
            width={screenWidth + 100} // Ajusta el ancho de acuerdo al contenido
            height={220}
            yAxisLabel={'%'}
            chartConfig={{
              backgroundGradientFrom: '#F8FAFF',
              backgroundGradientTo: '#F8FAFF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(90, 170, 250, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFF',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ReporteEstudiantesXEmprendientoScreen;
