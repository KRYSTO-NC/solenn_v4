// DonutEco.jsx
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const DonutEco = () => {
  const data = [
    {
      id: 'Réseau',
      label: 'Réseau',
      value: 50,
      color: '#97a6b6', // Couleur pour le réseau
    },
    {
      id: 'Autonomie solaire',
      label: 'Autonomie solaire',
      value: 50,
      color: '#ffa231', // Couleur pour l'autonomie solaire
    },
  ];

  return (
    <div style={{ height: '200px' }}>
      <ResponsivePie
        data={data}
        startAngle={0}
        endAngle={360}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={3}
        colors={({ data }) => data.color}
        borderWidth={0.3}
        borderColor={{ from: 'color', modifiers: [['darker', 0.9]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
      />
    </div>
  );
};

export default DonutEco;
