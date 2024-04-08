import { useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import { useGetSimulationsQuery, useDeleteSimulationMutation } from '../../../slices/simulationsApiSlice'
import { Link } from 'react-router-dom'
import Modal from '../../../components/shared/modal/Modal'

const SimulationsScreen = () => {
  const { data: simulations, error, isLoading , refetch } = useGetSimulationsQuery()
  const [selectedStatus, setSelectedStatus] = useState('En Service')
  const [selectedSimulationId, setSelectedSimulationId] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [deleteSimulation] = useDeleteSimulationMutation()

  const handleDeleteConfirmation = (simulationId) => {
    setSelectedSimulationId(simulationId)
    setShowConfirmation(true)
  }

  const handleDeleteSimulation = async () => {
    await deleteSimulation(selectedSimulationId)
    setShowConfirmation(false)
    setSelectedSimulationId(null)
    refetch()
  }

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
                <strong>Gagné</strong> apparaissent dans la liste. Pour
                voir des installations avec d'autres états, utilisez le menu
                déroulant ci-dessous.
              </p>
              {showConfirmation && (
            <div className='overlay'>
              <div className="modal">
                <p className='medium text-danger'> Etes vous sur de vouloir supprimer cette installation?</p>
                <div>
                  <button className='btn btn-success' onClick={handleDeleteSimulation}>Oui</button>
                  <button className= 'btn btn-danger'onClick={() => setShowConfirmation(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )}
              <div className="form">
                <select
                  className="select-filter"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="Gagné">Gagné</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Sans suite">Sans suite</option>
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
                        <button
                          variant="danger"
                          className="btn btn-danger"
                          onClick={() => handleDeleteConfirmation(simulation._id)}
                        >
                          <FaTrash/> 
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        
        </>
      )}
    </div>
  )
}

export default SimulationsScreen
