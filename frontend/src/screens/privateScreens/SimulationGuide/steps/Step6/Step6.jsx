import React, { useEffect, useState } from "react";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";

const Step6 = ({ installation, onNext }) => {
  const [ consoN, setConsoN] = useState({
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
  });
  const { data: simulation, isLoading, error } = useGetSimulationDetailsQuery(installation);
  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] = useUpdateSimulationMutation(installation);

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  const handleNFieldChange = (e) => {
    const { name, value } = e.target;
    setConsoN({ ...consoN, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        simulationId: installation,
        // ... autres champs
        consoN,
     
      };
      const response = await updateInstallation(dataToUpdate);
      console.log('Update Installation Response:', response);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="container">
      <h1>Consommation N de la simulation  - {simulation?.refference}</h1>
      {isLoading ? (
      <p>
        Chargement...
      </p>
      ) : error ? (
        <p variant="danger">{error}</p>
      ) : (
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {Object.keys(consoN).map((month) => (
                <div key={month} style={{ margin: "10px" }}>
                  <label>{`Consommation N ${month}`}</label>
                  <input
                    type="number"
                    name={month}
                    value={consoN[month]}
                    onChange={handleNFieldChange}
                  />
                </div>
              ))}
            </div>

            <button className="btn btn-success"  type="submit">Suivant</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Step6;
