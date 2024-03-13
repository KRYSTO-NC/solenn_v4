import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";

const Step11 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);
  console.log(simmulation);
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery(19);

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
        suppervision: selectedProducts,
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
        {/* <h1>Supervision : {simulation?.refference}</h1> */}
        <h1>Supervision : </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <>
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
                  <hr />
                  <div>
                    <strong>{product.refDolli}</strong>
                  </div>
                  <div>
                    <label>Quantité</label>
                    <input
                      type="number"
                      style={{ height: "30px" }}
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, Number(e.target.value), "quantity")
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

        <button type="submit" className="btn-primary mb-3">
          Suivant
        </button>
      </form>
    </div>
  );
};

export default Step11;