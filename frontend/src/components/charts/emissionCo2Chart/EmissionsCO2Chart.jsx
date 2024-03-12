import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const EmissionsCO2Chart = () => {
  const data = [
    {
      phase: 'Avant',
      CO2: 1500, // Valeur représentant les rejets de CO2 en kg avant l'installation
      couleur: '#3498db', // Couleur pour "Avant"
    },
    {
      phase: 'Après',
      CO2: 800, // Valeur représentant les rejets de CO2 en kg après l'installation
      couleur: '#2ecc71', // Couleur pour "Après"
    },
  ];

  return (
    <div style={{ height: '250px' }}>
      <ResponsiveBar
        data={data}
        keys={['CO2']}
        indexBy="phase"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={(bar) => bar.data.couleur} // Utilisez une fonction pour définir les couleurs dynamiquement
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Rejets annuel de CO2 (kg) avant et après l\'installation',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 1,
          tickRotation: 0,
          legend: 'Rejets de CO2 (kg)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};

export default EmissionsCO2Chart;
