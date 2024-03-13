import React, { useEffect, useState } from "react";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";


import { toast } from "react-toastify";

const Step4 = ({ installation, onNext }) => {
  // Initialisation des états
  const [concessionaire, setConcessionaire] = useState("");
  const [isRaccordeAuReseau, setIsRaccordeAuReseau] = useState(false);
  const [typeAbonnement, setTypeAbonnement] = useState("non defini");
  const [typeRaccordement, setTypeRaccordement] = useState("non defini");
  const [puissance, setPuissance] = useState(1);
  const [prof, setProf] = useState(false);
  const [amperage, setAmperage] = useState(0);
  const [numCompteurEnercal, setNumCompteurEnercal] = useState("non renseigné");
  const [garantieDuree, setGarantieDuree] = useState(1);
  const [numClientEnercal, setNumClientEnercal] = useState("non renseigné");
  const [numCompteurEEC, setNumCompteurEEC] = useState("non renseigné");
  const [address, setAddress] = useState("non renseigné");
  const [typeInstallation, setTypeInstallation] = useState({
    raccordement: "non defini",
    puissance: 0,
    amperage: 0,
  });

  // Pour raccordement
  const handleRaccordementChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      raccordement: e.target.value,
    });
  };

  // Pour puissance
  const handlePuissanceChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      puissance: e.target.value,
    });
  };

  // Pour amperage
  const handleAmperageChange = (e) => {
    setTypeInstallation({
      ...typeInstallation,
      amperage: e.target.value,
    });
  };

  const {
    data: simulation,
    isLoading,
    error,
  } = useGetSimulationDetailsQuery(installation);

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const dataToUpdate = {
            simulationId: installation,
            concessionaire,
            raccordReseau: isRaccordeAuReseau,
            typeAbonnement,
            typeRaccordement,
            puissance,
            amperage,
            numCompteurEnercal,
            numClientEnercal,
            address,
            prof,
            typeInstallation,
            status: "Projet",
          };
      
          console.log('Data to Update:', dataToUpdate);
      
          const response = await updateInstallation(dataToUpdate);
      
          console.log('Update Installation Response:', response);
      
          toast.success("Mise à jour réussie.");
        } catch (error) {
          toast.error("Une erreur est survenue lors de la mise à jour.");
          console.error("Erreur:", error);
        }
      };

  useEffect(() => {
    if (isSuccess) {
      onNext(); // ou handleNext() si vous renommez la prop
    }
  }, [isSuccess, onNext]);

  return (
    <div className="container">
      <h1>Détails sur l'installation - {simulation?.refference}</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Une erreur est survenue lors de la récupération des données de la simulation.</p>
      ) : (
        <section>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label>Adresse</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label>Concessionaire</label>
              <select value={concessionaire} onChange={(e) => setConcessionaire(e.target.value)}>
                <option value="" disabled>Choisir un concessionaire</option>
                <option value="EEC">EEC</option>
                <option value="Enercal">Enercal</option>
              </select>
            </div>
            <div>
              <label>Le client est-il un professionnel ?</label>
              <input type="checkbox" checked={prof} onChange={(e) => setProf(e.target.checked)} />
            </div>
            <div>
              <label>Raccordée au réseau</label>
              <select value={isRaccordeAuReseau.toString()} onChange={(e) => setIsRaccordeAuReseau(e.target.value === "true")}>
                <option value="" disabled>Choisir</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
            {isRaccordeAuReseau && (
              <>
                <div>
                  <label>Type d'abonnement</label>
                  <select value={typeAbonnement} onChange={(e) => setTypeAbonnement(e.target.value)}>
                    <option value="" disabled>Choisir un type d'abonnement</option>
                    <option value="Basse tension">Basse tension</option>
                    <option value="Haute tension">Haute tension</option>
                    <option value="non defini">Non défini</option>
                  </select>
                </div>
                <div>
                  <label>Type de raccordement</label>
                  <select value={typeInstallation.raccordement} onChange={handleRaccordementChange}>
                    <option value="mono">Mono</option>
                    <option value="tri">Tri</option>
                    <option value="non defini">Non défini</option>
                  </select>
                </div>
                <div>
                  <label>Puissance</label>
                  <input type="number" value={typeInstallation.puissance} onChange={handlePuissanceChange} />
                </div>
                <div>
                  <label>Amperage</label>
                  <input type="number" value={typeInstallation.amperage} onChange={handleAmperageChange} />
                </div>
              </>
            )}
            {concessionaire === "Enercal" && (
              <>
                <div>
                  <label>Numéro du compteur Enercal</label>
                  <input type="text" value={numCompteurEnercal} onChange={(e) => setNumCompteurEnercal(e.target.value)} />
                </div>
                <div>
                  <label>Numéro du client Enercal</label>
                  <input type="text" value={numClientEnercal} onChange={(e) => setNumClientEnercal(e.target.value)} />
                </div>
              </>
            )}
            {concessionaire === "EEC" && (
              <>
                <div>
                  <label>Numéro du compteur EEC</label>
                  <input type="text" value={numCompteurEEC} onChange={(e) => setNumCompteurEEC(e.target.value)} />
                </div>
              </>
            )}
            <button className="btn btn-success" type="submit">Suivant</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Step4;