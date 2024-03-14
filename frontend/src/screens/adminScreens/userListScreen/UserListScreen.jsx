
import {
  FaTrash,
  FaTimes,
  FaEdit,
  FaCheck,
  FaPlusCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { useState } from "react";
import { useDeleteUsersMutation, useGetUsersQuery, useRegisterMutation } from "../../../slices/userApiSlice";
import { Link } from "react-router-dom";


const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUsersMutation();

  const [showModal, setShowModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    isAdmin: false,
  });

  const [registerUser] = useRegisterMutation();

  // const createNewUser = async () => {
  //   try {
  //     const newUser = await registerUser(newUserData).unwrap();
  //     toast.success("Utilisateur créé avec succès.");
  //     refetch();  // pour rafraîchir la liste des utilisateurs
  //     setShowModal(false); // pour fermer la modale
  //   } catch (error) {
  //     toast.error(error.message || "Une erreur s'est produite");
  //   }
  // };
  const deleteHandler = async (id) => {
    // Trouver l'utilisateur correspondant à l'ID donné
    const userToDelete = users?.find((user) => user._id === id);
    
    // Vérifier si l'utilisateur est un administrateur
    if (userToDelete?.isAdmin) {
      toast.error("Vous ne pouvez pas supprimer un utilisateur avec le statut admin");
      return;
    }
  
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      try {
        await deleteUser(id);
        toast.success("Utilisateur supprimé avec succès");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  
  return (
    <div className="container">
      <h1 className="large">Utilisateurs</h1>
      {loadingDelete &&  <p>Suppression en cours...</p> }
      {isLoading ? (
       <p>Chargement...</p>
      ) : error ? (
        <p>Une erreur c'est produite</p>
      ) : (
        <div >
          <button
            className="btn btn-primary my-3"
            onClick={() => setShowModal(true)}
          >
            <FaPlusCircle style={{ marginRight: "10px" }} /> Ajouter un
            utilisateur
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Administrateur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name && user.name}</td>
                  <td>
                    {" "}
                    <a href={`mailto: ${user.email}`}>{user.email}</a>{" "}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td>
                    <>
                      <Link to={`/user/${user._id}`}>
                        <button className="btn btn-warning">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                       
                        className="btn btn-danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      )}
    </div>
  );
};

export default UserListScreen;