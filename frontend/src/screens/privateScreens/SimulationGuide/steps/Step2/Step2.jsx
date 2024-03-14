import React, { useEffect, useState } from "react";
import { useGetThirdPartiesQuery } from "../../../../../slices/dolibarr/dolliThirdPartyApiSlice";



import { FaPlusCircle } from "react-icons/fa";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";


const Step2 = ({ installation, onNext }) => {
  const [selectedThirdParty, setSelectedThirdParty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const {
    data: simulation,
    isLoading,
    refetch,
    error,
  } = useGetSimulationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);
    console.log('====================================');
    console.log(selectedThirdParty && selectedThirdParty.id);
    console.log('====================================');
  const {
    data: tiers,
    isLoading: loadingTiers,
    error: errorTiers,
  } = useGetThirdPartiesQuery();

  const handleValidate = async () => {
    console.log('Données de mise à jour :', {
        simulationId: installation,
        demandeur: selectedThirdParty ? selectedThirdParty.id : null,
      });
    
      try {
        await updateInstallation({
          simulationId: installation,
          demandeur: selectedThirdParty ? selectedThirdParty.id : null,
        });
  
 
      toast.success("Demandeur ajouté avec succées.");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors de la validation de l'installation."
      );
      console.error("Une erreur est survenue:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onNext(installation); // ou handleNext(installation) si vous renommez la prop
    }
  }, [isSuccess, onNext, installation]);

  const filteredTiers = tiers?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(tiers);


  return (
    <div className="container">
      <h1>Demandeur</h1>
      <div style={{ marginBottom: "20px" }}>

    <p className="lead"> Avant de continuer, assurez-vous que le client est déjà enregistré dans Dolibarr. </p>



    <div md={2}>
                <a
                  className="btn btn-primary btn-sm my-3"
                  href={`https://solisdev-erp.square.nc/societe/card.php?leftmenu=customers&action=create&type=c`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 
                 Créer le client
                </a>
            
  </div>
</div>

      {/* <SearchBar onChange={(e) => setSearchTerm(e.target.value)} /> */}

      {isLoading || loadingTiers ? (
        <p>Chargment...</p>
      ) : error ? (
        <p>
          Une erreur est survenue lors du chargement des données. Veuillez reesayer
        </p>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div md={8}>
            <table striped hover responsive className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Adresse</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredTiers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>
                      {user.email ? (
                        <td>
                          {" "}
                          <a href={`mailto: ${user.email}`}>{user.email}</a>
                        </td>
                      ) : (
                        <td style={{ color: "red" }}> Non renseignée</td>
                      )}
                    </td>

                    {user.address ? (
                      <td> {user.address}</td>
                    ) : (
                      <td style={{ color: "red" }}> Non renseignée</td>
                    )}
                    <td>
                      <>
                        <button
                          variant="success"
                          className="btn btn-success"
                          onClick={() => setSelectedThirdParty(user)}
                        >
                          <FaPlusCircle />
                        </button>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div md={4}>
            {selectedThirdParty ? (
              <>
                <h3>Selection:</h3>
                <p>
                  <strong>Nom :</strong>{" "}
                  {selectedThirdParty.name || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  {selectedThirdParty.email || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Adresse :</strong>{" "}
                  {selectedThirdParty.address || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Code postal :</strong>{" "}
                  {selectedThirdParty.zip || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Ville :</strong>{" "}
                  {selectedThirdParty.town || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  {selectedThirdParty.phone || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
                <p>
                  <strong>Mobile :</strong>{" "}
                  {selectedThirdParty.phone_mobile || (
                    <span style={{ color: "red" }}>Non renseignée</span>
                  )}
                </p>
              </>
            ) : (
              <p>Veuillez sélectionner un tiers pour voir les détails.</p>
            )}
            <button className="btn btn-success" onClick={handleValidate}>
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
