import React from 'react'
import InstallationCalendar from '../../../components/screens/dashboard/DashboardCalendar/InstallationCalendar'
import SimulationStatusChart from '../../../components/screens/dashboard/SimulationStatusChart'

const HomeScreen = () => {
  return (
    <div className="container">
      <h1 className="large">DASHBOARD</h1>

{/* 
<h2>Retard sur les installations</h2>
      <InstallationCalendar /> */}
<h2>Nombre d'installations par ans et par status</h2>
      <SimulationStatusChart />
    </div>
  )
}

export default HomeScreen
