import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";

const Step9 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);
  console.log(simmulation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(5);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProduct = (product) => {
    console.log(product);
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      { id: product.id, ref: product.id, refDolli:product.label, quantity: 1,  multiprices : { part : product.multiprices?.["1"] ?? "0" , pro: product.multiprices?.["2"] ?? "0"}  },
    ]);
  };

  const removeProduct = (ref) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.ref !== ref)
    );
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
        supportage: selectedProducts,
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
        {/* <h1>Supportage : {simulation?.refference}</h1> */}
        <h1>Supportage : </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <>
          {/* Tableau des produits */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: "0 0 48%" }}>
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
                <table style={{ width: "100%" }}>
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
                            className="btn-success btn-sm"
                            onClick={() => addProduct(product)}
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ flex: "0 0 48%" }}>
              <h3>Sélection :</h3>
              {selectedProducts.map((product) => (
                <div key={product.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "0 0 70%" }}>{product.refDolli}</div>
                    <div style={{ flex: "0 0 20%" }}>
                      <input
                        style={{ height: "30px" }}
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product.id, Number(e.target.value))
                        }
                      />
                    </div>
                    <div style={{ flex: "0 0 10%" }}>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => removeProduct(product.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>

        <button type="submit" className="btn-primary mb-3">
          Suivant
        </button>
      </form>
    </div>
  );
};

export default Step9