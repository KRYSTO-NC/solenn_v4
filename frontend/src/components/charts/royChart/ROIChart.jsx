import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const ROIChart = () => {
  const data = [
    {
      year: '1',
      value: -900, // Initial investment (negative)
    },
    {
      year: '2',
      value: -800, // Positive return on investment
    },
    {
      year: '3',
      value: -600,
    },
    {
      year: '4',
      value: -500,
    },
    {
      year: '5',
      value: -200,
    },
    {
      year: '6',
      value: 100, // Initial investment (negative)
    },
    {
      year: '7',
      value: 200, // Positive return on investment
    },
    {
      year: '8',
      value: 300,
    },
    {
      year: '9',
      value: 500,
    },
    {
      year: '10',
      value: 600,
    },
    {
      year: '11',
      value: 700, // Initial investment (negative)
    },
    {
      year: '12',
      value: 800, // Positive return on investment
    },
    {
      year: '13',
      value: 900,
    },
    {
      year: '14',
      value: 1000,
    },
    {
      year: '15',
      value: 2000,
    },
    // Add more data for subsequent years
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="year"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={(bar) => (bar.data.value < 0 ? '#ff5733' : '#4caf50')} // Red for negative, green for positive
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Retour sur investissement (MF / an)',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 20,
          tickPadding: -5,
          tickRotation: -20,
          format: (value) => (value < 0 ? `${value}k` : `+${value}k`), // Format labels for negative and positive values
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
      />
    </div>
  );
};

export default ROIChart;
