// MonDiagrammeBarres.jsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const GainFinancierAnnuel = () => {
  const données = [
    {
      année: 'Avant',
      valeur: 283000,
      couleur: '#97a6b6', // Couleur pour "Avant"
    },
    {
      année: 'Après',
      valeur: 65000,
      couleur: '#ffa231', // Couleur pour "Après"
    },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={données}
        keys={['valeur']}
        indexBy="année"
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
          legend: 'Gain finnancier annuel (XPF)',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 0,
          tickRotation: -20,
          format: (valeur) => `${valeur}k`,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
      />
    </div>
  );
};

export default GainFinancierAnnuel;
