import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../../../../slices/dolibarr/dolliProductApiSlice";
import { FaTrash } from "react-icons/fa";
import { useGetSimulationDetailsQuery, useUpdateSimulationMutation } from "../../../../../slices/simulationsApiSlice";

const Step7 = ({ installation, onNext }) => {
  const { data: simmulation } = useGetSimulationDetailsQuery(installation);
  const { data: products, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery(21);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);

  const addProduct = (product) => {
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      {
        id: product.id,
        refDolli: product.label,
        ref: product.id,
        quantity: 1,
        supervision: 0,
        multiprices: {
          part: product.multiprices?.["1"] ?? "0",
          pro: product.multiprices?.["2"] ?? "0"
        }
      }
    ]);
  };

  const removeProduct = (id) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const updateQuantity = (id, value) => {
    setUpdatedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: value } : product
      )
    );
  };

  const handleUpdate = async () => {
    const mergedProducts = updatedProducts.length > 0 ? updatedProducts : selectedProducts;
    console.log(mergedProducts);
    try {
      await updateInstallation({
        simulationId: installation,
        onduleurs: mergedProducts,
      });
      toast.success("Mise à jour réussie.");
      onNext();
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const [updateInstallation, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateSimulationMutation(installation);

  useEffect(() => {
    if (isSuccess) {
      // Ne pas passer automatiquement à l'étape suivante ici
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <div className="heading">
        <h1>Onduleurs de l'installation :</h1>
      </div>
      <form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "0 0 48%" }}>
            {loadingProducts ? (
              <p>Chargement...</p>
            ) : errorProducts ? (
              <p variant="danger">
                {typeof errorProducts.data.message === "string"
                  ? errorProducts.data.message
                  : "Une erreur est survenue"}
              </p>
            ) : (
              <table className="table" style={{ width: "100%" }}>
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
                          className="btn-success btn"
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
        <button type="button" className="btn btn-success" onClick={handleUpdate}>
          Suivant
        </button>
      </form>
    </div>
  );
};

export default Step7;
