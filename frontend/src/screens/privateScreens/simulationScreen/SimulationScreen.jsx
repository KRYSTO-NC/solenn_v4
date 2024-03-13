import { useState } from 'react'

import { FaEye } from 'react-icons/fa'
import { useGetSimulationsQuery } from '../../../slices/simulationsApiSlice'
import { Link } from 'react-router-dom'

const SimulationsScreen = () => {
  const { data: simulations, error, isLoading } = useGetSimulationsQuery()

  console.log('====================================')
  console.log(simulations)
  console.log('====================================')
  const [selectedStatus, setSelectedStatus] = useState('En Service')
  return (
    <div className="container">
      {isLoading ? (
        <p>chargement...</p>
      ) : error ? (
        <p variant="danger">{error?.data?.message || error.error}</p>
      ) : (
        <>
          <h1 className='large'>Simulations</h1>
          <div className="align-items-center">
            <div className="text-end">
              <p className='lead'>
                Initialement, seules les installations{' '}
                <strong>en service</strong> apparaissent dans la liste. Pour
                voir des installations avec d'autres états, utilisez le menu
                déroulant ci-dessous.
              </p>

              <div className="form">
                <select
                  className="select-filter"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="En Service">En service</option>
                  <option value="Projet">Projet</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Sans Suite">Sans suite</option>
                </select>
              </div>
            </div>
          </div>
          <table className="table ">
            <thead>
              <tr>
                <th>REFFERENCE</th>
                <th>Benneficaire</th>
                <th>Demandeur</th>
                <th>Adresse de l'installation</th>
                <th>Concessionaire</th>
                <th>status</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {simulations
                ?.filter(
                  (installation) =>
                    !selectedStatus || installation.status === selectedStatus,
                )
                .map((simulation) => {
                  // Ajoutez une condition pour filtrer les produits
                  if (simulation) {
                    return (
                      <tr key={simulation._id}>
                        <td>{simulation.refference}</td>
                        <td>{simulation.benneficiaire}</td>
                        <td>{simulation.demandeur}</td>
                        <td>{simulation.address}</td>
                        <td>{simulation.concessionaire}</td>
                        <td>{simulation.status}</td>
                        <td>
                          <Link to={`/simulation/${simulation._id}`}>
                            <button
                              variant="success"
                              className="btn btn-success"
                            >
                              <FaEye />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )
                  } else {
                    // Retournez null si le produit ne correspond pas au critère
                    return null
                  }
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default SimulationsScreen
