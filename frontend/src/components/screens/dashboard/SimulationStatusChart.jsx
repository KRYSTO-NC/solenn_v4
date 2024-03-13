import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const SimulationStatusChart = () => {
  // Génération de données factices pour le graphique
  const data = [
    { year: 2022, 'En service': 100, Simulations: 80, Projet: 50, 'En cours': 30, 'Sans suite': 20 },
    { year: 2023, 'En service': 110, Simulations: 90, Projet: 60, 'En cours': 40, 'Sans suite': 30 },
    { year: 2024, 'En service': 120, Simulations: 100, Projet: 70, 'En cours': 50, 'Sans suite': 40 },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['En service', 'Simulations', 'Projet', 'En cours', 'Sans suite']}
        indexBy="year"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Nombre',
          legendPosition: 'middle',
          legendOffset: -40,
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
        barAriaLabel={(e) => `${e.indexValue}: ${e.value} simulations en ${e.id}`}
      />
    </div>
  );
};

export default SimulationStatusChart;
