import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSimulationDetailsQuery } from '../../../slices/simulationsApiSlice';
import ThirdPartieCard from '../../../components/shared/ThirdpartieCard/ThirdPartieCard';
import './simulationDetails.css'

import logoEec from '../../../assets/logo-eed.png';
import logoDimenc from '../../../assets/logo_dimenc.jpg';
import logoEnercal from '../../../assets/logo-enercal.svg';
import CardAdministratif from '../../../components/CardAdministratif/CardAdministratif';
const SimulationDetails = () => {
    const { id: simulationId } = useParams();

    const { data: simulation, isLoading, error } = useGetSimulationDetailsQuery(simulationId);
console.log(simulation);
    return (
        <div className='container'>
            <h1 className="large">Simulation details</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
                <div className="simulation-top">
                <p className='lead'>
                    <strong>Reference:</strong> {simulation?.refference}
                  </p>
                  <p className='badge badge-primary'>
                    {simulation.status}
                  </p>
                </div>
                <div className="thirdpartie-container">

                <ThirdPartieCard tierId={simulation.demandeur}  title={"demandeur"}/>
                <ThirdPartieCard tierId={simulation.benneficiaire}  title={"benneficiaire"}/>
                </div>



                <h3 className='medium'>Etat des démarches</h3>
                 <div className="formalite-container">
                    <CardAdministratif logo={logoEec} title="Demande EEC" data={simulation.demandeEEC} />
                    <CardAdministratif  logo={logoDimenc}  title="Demande DIMENC" data={simulation.demandeDimenc} />
                    <CardAdministratif  logo={logoEnercal} title="Demande ENERCAL" data={simulation.demandeEnercal} />
                 </div>
                </>
            )}
        </div>
    );
};

export default SimulationDetails;
