import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useGetSimulationsQuery } from '../../../slices/simulationsApiSlice';

const SimulationStatusChart = () => {
  // Récupération des données de simulations
  const { data: simulations, isError, isLoading } = useGetSimulationsQuery();

  // Fonction pour regrouper les données par année et par statut
  const getChartData = () => {
    const chartData = {};

    // Parcours des simulations pour regrouper les données
    simulations.forEach((simulation) => {
      const year = new Date(simulation.createdAt).getFullYear();
      const status = simulation.status;

      if (!chartData[year]) {
        chartData[year] = {};
      }

      if (!chartData[year][status]) {
        chartData[year][status] = 1;
      } else {
        chartData[year][status]++;
      }
    });

    // Transformation des données pour les adapter au format attendu par le composant ResponsiveBar
    const formattedData = Object.keys(chartData).map((year) => ({
      year: parseInt(year),
      ...chartData[year],
    }));

    return formattedData;
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div style={{ height: '400px' }}>
          <ResponsiveBar
            data={getChartData()}
            keys={['Prospect', 'Gagné', 'Sans suite']}
            indexBy="year"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Nombre',
              legendPosition: 'middle',
              legendOffset: -40,
              tickFormat: (value) => parseInt(value), // Affiche uniquement des entiers
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Nombre',
              legendPosition: 'middle',
              legendOffset: -40,
              tickValues: 'every 1',
              tickFormat: (value, index, values) => {
                const filteredValues = values.filter((v, i) => values.indexOf(v) === i); // Filtrer les valeurs répétées
                return filteredValues[index]; // Retourner la valeur filtrée correspondante
              },
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) => `${e.indexValue}: ${e.value} simulations en ${e.index}`}
            colors={(e) => {
              if (e.id === 'Prospect') return 'blue'; // Prospect en bleu
              if (e.id === 'Gagné') return 'green'; // Gagné en vert
              if (e.id === 'Sans suite') return 'red'; // Sans suite en rouge
              return 'gray'; // Autres statuts en gris par défaut
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SimulationStatusChart;
