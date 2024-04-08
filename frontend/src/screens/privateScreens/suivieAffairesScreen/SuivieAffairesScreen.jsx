import React from 'react'
import { Link } from 'react-router-dom'
import { useGetSimulationsQuery } from '../../../slices/simulationsApiSlice'

const SuivieAffairesScreen = () => {
  const { data: simulations, isLoading, error } = useGetSimulationsQuery()
  console.log(simulations)

  return (
    <div className="container">
      {isLoading ? (
        <p>chargement...</p>
      ) : error ? (
        <p variant="danger">{error?.data?.message || error.error}</p>
      ) : (
        <div className="container">
          <h1 className="large">Suivi des affaires</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Status</th>
                <th>Date accord</th>
                <th>Date accompte</th>
                <th>Date prev- pose</th>
                <th>Date pose</th>
                <th>Date prev M.E.S</th>
                <th>Date M.E.S</th>
                {/* <th>Charg.</th>
                <th>Type</th>
                <th>Date Accord</th>
                <th>Dem. concess</th>
                <th>Obt. concess</th>
                <th>Dem. Dimenc</th>
                <th>Obt. Dimenc</th>
                <th>Acpte. reçu</th>
                <th>Prev pose</th>
                <th>Cotsuel</th>
                <th>Facture</th> */}
              </tr>
            </thead>
            <tbody>
              {simulations.map((simulation) => (
                <tr key={simulation._id}>
                  <td>
                    <Link to={`/simulation/${simulation._id}`}>
                      {simulation.refference}
                    </Link>
                  </td>
                  <td>{simulation.status}</td>
                  {simulation.dateAccord.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(
                        simulation.dateAccord.date,
                      ).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}
                  {simulation.accompte.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(simulation.accompte.date).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}

                  {simulation.datePrevisionelPose.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(
                        simulation.datePrevisionelPose.date,
                      ).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}
                  {simulation.datePose.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(
                        simulation.datePose.date,
                      ).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}
                  {simulation.datePrevisionelMiseEnService.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(
                        simulation.datePrevisionelMiseEnService.date,
                      ).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}
                  {simulation.dateMiseEnService.date ? (
                    <td style={{ backgroundColor: 'green', color: 'white' }}>
                      {new Date(
                        simulation.dateMiseEnService.date,
                      ).toLocaleDateString()}
                    </td>
                  ) : (
                    <td style={{ backgroundColor: 'red', color: 'white' }}>
                      Non
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SuivieAffairesScreen
