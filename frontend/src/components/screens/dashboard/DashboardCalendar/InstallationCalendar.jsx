import React from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar';

const InstallationCalendar = () => {
  // Fonction pour générer des données factices pour le calendrier
  const generateFakeData = () => {
    const startDate = new Date(2024, 0, 1); // 1er janvier 2024
    const endDate = new Date(2024, 11, 31); // 31 décembre 2024

    const data = [];

    // Générer des données pour chaque jour de l'année
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      // Générer aléatoirement si l'installation est en retard ou non
      const isDelayed = Math.random() < 0.2; // 20% de chances d'être en retard

      data.push({
        day: date.toISOString().slice(0, 10), // Format YYYY-MM-DD
        value: isDelayed ? 0 : 1, // 1 pour à temps, 0 pour en retard
      });
    }

    return data;
  };

  const installationData = generateFakeData();

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveTimeRange
        data={installationData}
        from="2024-01-01"
        to="2024-12-31"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 10, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
            translateX: -60,
            translateY: -80,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
};

export default InstallationCalendar;
