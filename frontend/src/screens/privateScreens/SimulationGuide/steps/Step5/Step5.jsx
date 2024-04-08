import React, { useEffect, useState } from 'react'
import {
  useGetSimulationDetailsQuery,
  useUpdateSimulationMutation,
} from '../../../../../slices/simulationsApiSlice'

import { toast } from 'react-toastify'

const Step5 = ({ installation, onNext }) => {
  const [consoN1, setconsoN1] = useState({
    janv: 0,
    fev: 0,
    mars: 0,
    avril: 0,
    mai: 0,
    juin: 0,
    juillet: 0,
    aout: 0,
    sept: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  })

  const handleN1FieldChange = (e) => {
    setconsoN1({
      ...consoN1,
      [e.target.name]: e.target.value,
    })
  }

  const { data: simulation, isLoading, error } = useGetSimulationDetailsQuery(
    installation,
  )

  const [
    updateInstallation,
    { isLoading: isUpdating, isError, isSuccess },
  ] = useUpdateSimulationMutation(installation)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const dataToUpdate = {
        simulationId: installation,
        // ... autres champs
        consoN1,
    
      }

      console.log('Data to Update:', dataToUpdate)

      const response = await updateInstallation(dataToUpdate)

      console.log('Update Installation Response:', response)

      toast.success('Mise à jour réussie.')
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour.')
      console.error('Erreur:', error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onNext()
    }
  }, [isSuccess, onNext])

  return (
    <div className="container">
      <h1>Consommation N-1 de la simulation - {simulation?.refference}</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>
          Une erreur est survenue lors de la récupération des données de la
          simulation.
        </p>
      ) : (
        <div>
          <form className="form" onSubmit={handleSubmit}>
            
          <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Object.keys(consoN1).map((month) => (
                <div key={month} style={{ margin: "10px" }}>
                  <label>{`Consommation N -1 ${month}`}</label>
                  <input
                    type="number"
                    name={month}
                    value={consoN1[month]}
                    onChange={handleN1FieldChange}
                  />
                </div>
               
              ))}
            </div>
            <button className="btn btn-success" type="submit">
              Suivant
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Step5
