import React from 'react'
import GainFinancierAnnuel from '../../../components/charts/line/GainFinancierAnnuel'
import ROIChart from '../../../components/charts/royChart/ROIChart'
import logoSolis from '../../../assets/logo-solis.png'
import DonutEco from '../../../components/charts/donutEco/DonutEco'
import EmissionsCO2Chart from '../../../components/charts/emissionCo2Chart/EmissionsCO2Chart'
import './simulationSolis.css'
const SimulationSolis = () => {
  return (
    <div>
      <div className="container">
        <div className="simulation-top">
          <div className="logo-solis">
            <img src={logoSolis} alt="logo-solis" />
          </div>
          <div className="simulation-top-left medium">
            <h2>Simulation de production d'énergie solaire</h2>
            <p>
              Découvrez le potentiel de production d'énergie solaire de votre
              toit et estimez votre gain financier annuel.*
            </p>
    
    
       
          </div>
  
        </div>
        <i>
          *Ces données sont des estimations et ne constituent pas un engagement
          contractuel. Les données de production sont basées sur des moyennes
          annuelles et ne tiennent pas compte des variations climatiques. Ce
          sont des données estimatives et non contractuelles pour une
          installation de moins de 36 K VA.
        </i>

        <div className="simulation-infos">
            <h3 className="medium">Contacts et informations</h3>
            <hr />
            <div className="simulation-infos-container">
                <div>
                <h3>Refference</h3>
                <p>2021-260</p>
                </div>
                <div>
                <h3>Type</h3>
                <p>Auto conso 6,6 KWc</p>
                </div>
                <div>
                <h3>Votre contact Solis</h3>
                <p>Wilfrid GUILLAUME</p>
                <p>77.57.45</p>
                <p>solis@solis.nc</p>
                </div>
                
            </div>
            <div className="simulation-infos-container">
                <div>
                <h3>Adresse</h3>
                <p>12 rue des cocotiers, 98700 Papeete</p>
                </div>
                <div>
                <h3>Surface disponible</h3>
                <p>120 m²</p>
                </div>
                <div>
                <h3>Orientation</h3>
                <p>Sud</p>
                </div>
                <div>
                <h3>Inclinaison</h3>
                <p>30°</p>
                </div>
                <div>
                <h3>Surface disponible</h3>
                <p>120 m²</p>
                </div>
            </div>
        </div>
       
        

        <div className="bilan-energie">
          <h3 className="medium">Bilan Energétique</h3>
          <hr />
          
          <div className="bilan-energie-container">
            <div>
              <h3>Avant</h3>

              <div className="residu">
               Consomation
                <p>6 114 kWh</p>
             </div>
            </div>
            <div>
              <h3>Après</h3>
             <div className="residu">
                revente
                <p>7120 kWh</p>
             </div>
             <div className="residu">
                COnso. Résiduel
                <p>3057 kWh</p>
             </div>
             <div className="residu">
                Auto Conso 
                <p>3057 kWh</p>
             </div>
            </div>
          </div>
        </div>
        <div className="bilan-eco">
          <h3 className="medium">Bilan Ecologique</h3>
          <hr />
      
<div>

          <DonutEco />

          <EmissionsCO2Chart />
</div>
       
        </div>

        <div className="BFE">
          <h3 className="medium">
            Bilan Financier* 
          </h3>
          <small>Estimé (hors déduction fiscale)</small>
          <hr />
          <div className="gfa">
            <GainFinancierAnnuel />
            <h4 className='text-secondary'> Votre gain finnancier annuel en XPF*</h4>
            <div className="chart-recap">
              <p className="lead">votre gain finnancier annuel</p>
              <div className="medium">217447 XPF</div>
            </div>
          </div>
          <div className="roi">
            <h4>Votre retour sur investissement sur 15 ans *</h4>
            <ROIChart />

            <div className="chart-recap">
              <p className="lead">Soit sur 15 ans</p>
              <div className="medium">3261708 XPF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimulationSolis
