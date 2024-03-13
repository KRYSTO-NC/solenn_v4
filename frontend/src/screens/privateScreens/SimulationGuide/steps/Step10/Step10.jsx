import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";

const Step10 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(22);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [stockage, setStockage] = useState(false);
  const [typeBatterie, setTypeBatterie] = useState("");
  const [capaciteBatterie, setCapaciteBatterie] = useState(0);

  const addProduct = (product) => {
    console.log(product);
    setSelectedProducts((prevProducts) => [...prevProducts, { id: product.id, refDolli: product.label , ref: product.id, quantity: 1, supervision: 0 , multiprices : { part : product.multiprices?.["1"] ?? "0" , pro: product.multiprices?.["2"] ?? "0"} }]);
  };

  const removeProduct = (ref) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.ref !== ref));
  };
  
  const updateQuantity = (ref, value, field) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ref === ref ? { ...product, [field]: value } : product
      )
    );
  };
  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedProducts);
    try {
      await updateInstallation({
        simulationId: installation,
        stockage,
        typeBatterie,
        capaciteBatterie,
        batteries : selectedProducts,
      });
      console.log("selectedProducts", selectedProducts);
      console.log("updatedInstallation", updateInstallation);
      toast.success("Mise à jour réussie.");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  return (
    <div className="container">
      <div className="heading">
        {/* <h1>Stockage de l'installation : {simulation?.refference}</h1> */}
        <h1>Stockage de l'installation : </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            L'installation aura-t-elle du stockage
            <input
              type="checkbox"
              checked={stockage}
              onChange={(e) => setStockage(e.target.checked)}
            />
          </label>
        </div>
        {stockage && (
          <>
            <div>
              <label>Type de Batterie</label>
              <select
                value={typeBatterie}
                onChange={(e) => setTypeBatterie(e.target.value)}
              >
                <option value="">Choisir un type</option>
                <option value="Lithium Ion">Lithium Ion</option>
                <option value="Plomb">Plomb</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label>Capacité total des batteries</label>
              <input
                type="number"
                value={capaciteBatterie}
                onChange={(e) => setCapaciteBatterie(Number(e.target.value))}
              />
            </div>
            {/* Tableau des produits */}
            <div>
              <div>
                {loadingProducts ? (
                  <p>
                    Chargement...
                  </p>
                ) : errorProducts ? (
                  <p variant="danger">
                    {typeof errorProducts.data.message === "string"
                      ? errorProducts.data.message
                      : "Une erreur est survenue"}
                  </p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Refference</th>
                        <th>Désignation</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.ref}</td>
                          <td>{product.label}</td>
                          <td>
                            <button
                              className="btn-success"
                              onClick={() => addProduct(product)}
                            >
                              Ajouter
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div>
                <h3>Sélection :</h3>
                {selectedProducts.map((product) => (
                  <div key={product.id}>
                    <div>
                      <strong>{product.refDolli}</strong>
                    </div>
                    <div>
                      <label>Quantité</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product.id, Number(e.target.value), 'quantity')
                        }
                      />
                    </div>
                    <div>
                      <label>Supervision</label>
                      <input
                        type="number"
                        value={product.supervision}
                        onChange={(e) =>
                          updateQuantity(product.id, Number(e.target.value), 'supervision')
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="btn-danger"
                        onClick={() => removeProduct(product.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <button type="submit" className="btn-primary mb-3">
          Suivant
        </button>
      </form>
    </div>
  );
};

export default Step10;