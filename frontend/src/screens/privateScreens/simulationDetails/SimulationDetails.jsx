import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useGetSimulationDetailsQuery,
  useUpdateSimulationMutation,
} from '../../../slices/simulationsApiSlice'
import ThirdPartieCard from '../../../components/shared/ThirdpartieCard/ThirdPartieCard'
import './simulationDetails.css'

import logoEec from '../../../assets/logo-eed.png'
import logoDimenc from '../../../assets/logo_dimenc.jpg'
import logoEnercal from '../../../assets/logo-enercal.svg'
import logoCotsuel from '../../../assets/logo-cotsuel.png'
import CardAdministratif from '../../../components/CardAdministratif/CardAdministratif'
import CardDate from '../../../components/CardDate/CardDate'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../../../slices/commentSlice'
import Modal from '../../../components/shared/modal/Modal'
import { FaBan, FaFileInvoice, FaTrash } from 'react-icons/fa'
import { useCreateProposalMutation } from '../../../slices/dolibarr/dolliProposalApiSlice'

const SimulationDetails = () => {
  const { id: simulationId } = useParams()

  const [commentText, setCommentText] = useState('')
  const [commentTitle, setCommentTitle] = useState('')
  const [filteredComments, setFilteredComments] = useState([])

  const { data: comments, refetch } = useGetCommentsQuery()
  const {
    data: simulation,
    isLoading,
    error,
    refetch: refetchSimulation,
  } = useGetSimulationDetailsQuery(simulationId)
  const [createComment] = useCreateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [
    updateSimulation,
    {
      isLoading: isUpdating,
      isError: errorUpdating,
      isSuccess: successUpdating,
    },
  ] = useUpdateSimulationMutation()
  console.log(simulation)
  console.log(comments)
  const [
    createProposal,
    { isLoading: isCreating, isError, isSuccess },
  ] = useCreateProposalMutation()

  const currentDate = new Date()
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000)
// Fonction pour mettre à jour la date dans SimulationDetails
const handleDateUpdate = async (dateField, newDate) => {
    try {
      await updateSimulation({
        simulationId,
        [dateField]: { date: newDate },
      });
      refetchSimulation();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la date :', error);
    }
  };

  const handleCreateProposal = async () => {
    const batteryLines = simulation.batteries.map((battery) => ({
      product_type: '1',
      fk_product: battery.ref, // Assurez-vous que c'est le bon ID
      qty: battery.quantity,
      subprice: battery.multiprices.part,
    }))
    const panneauLines = simulation.modulesPV.map((pan) => ({
      product_type: '1',
      fk_product: pan.ref, // Assurez-vous que c'est le bon ID
      qty: pan.quantity,
      subprice: pan.multiprices.part,
    }))

    const inverterLines = simulation.onduleurs.map((inverter) => ({
      product_type: '1',
      fk_product: inverter.ref, // Assurez-vous que c'est le bon ID
      qty: inverter.quantity,
      subprice: inverter.multiprices.part,
    }))

    const supportLines = simulation.supportage.map((support) => ({
      product_type: '1',
      fk_product: support.ref, // Assurez-vous que c'est le bon ID
      qty: support.quantity,
      subprice: support.multiprices.part,
    }))
    const suppervisionLines = simulation.suppervision.map((suppervision) => ({
      product_type: '1',
      fk_product: suppervision.ref, // Assurez-vous que c'est le bon ID
      qty: suppervision.quantity,
      subprice: suppervision.multiprices.part,
    }))
    const prestationsLines = simulation.prestations.map((prestation) => ({
      product_type: '1',
      fk_product: prestation.ref, // Assurez-vous que c'est le bon ID
      qty: prestation.quantity,
      subprice: prestation.multiprices.part,
    }))

    const lines = [
      ...batteryLines,
      ...inverterLines,
      ...supportLines,
      ...panneauLines,
      ...suppervisionLines,
      ...prestationsLines,
    ]

    const proposalData = {
      socid: simulation.demandeur,
      user_author_id: '18',
      date: unixTimestamp,
      array_options: {
        options_contact: '2',
        options_vente: '3',
      },
      lines,
    }

    try {
      const response = await createProposal({ proposalData }).unwrap()
      await updateSimulation({
        simulationId,
        idPropal: response,
      })
      refetchSimulation()
      //   toast.success(
      //     "La proposition et l'installation ont été mises à jour avec succès !",
      //   )
    } catch (error) {
      //   toast.error(
      //     "Échec de la création de la proposition ou de la mise à jour de l'installation",
      //   )
    }
  }

  useEffect(() => {
    if (comments) {
      const filtered = comments.filter(
        (comment) => comment.simulationId === simulationId,
      )
      setFilteredComments(filtered)
    }
  }, [comments, simulationId])

  const handleCommentSubmit = async () => {
    if (!commentText) return

    try {
      await createComment({
        simulationId,
        title: commentTitle,
        content: commentText,
      })
      setCommentText('')
      setCommentTitle('')
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error)
    }
  }
  const handleClasserSansSuite = async () => {
    try {
      await updateSimulation({
        simulationId,
        status: 'Sans suite',
      })
      refetchSimulation()
    } catch (error) {}
  }
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId)
      // Rafraîchir la liste des commentaires après la suppression
      refetch()
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire :', error)
    }
  }

  return (
    <div className="container">
      <h1 className="large">Simulation details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {simulation.status !== 'Sans Suite' && (
            <button
              className="btn btn-sm btn-danger"
              onClick={handleClasserSansSuite}
            >
              <FaBan style={{ marginRight: '5px' }} />
              Classer sans-suite
            </button>
          )}
          <div className="simulation-top">
            {simulation.idPropal === null ? (
              <button className="btnbtn-primary" onClick={handleCreateProposal}>
                <FaFileInvoice style={{ marginRight: '5px' }} />
                Créer la proposition dans Dolibarr
              </button>
            ) : (
              <>
                <p>
                  Identifiant de la proposition commercial Dolibarr :{' '}
                  <strong
                    className="tag"
                    style={{
                      padding: '5px 10px',
                      color: 'orange',
                    }}
                  >
                    {simulation.idPropal}{' '}
                  </strong>
                </p>
                <Link
                  target="_blank"
                  className="btn btn-primary"
                  to={`https://solis-erp.square.nc/comm/propal/card.php?id=${simulation.idPropal}`}
                >
                  Voir{' '}
                </Link>
              </>
            )}

            <p className="lead">
              <strong>Reference:</strong> {simulation?.refference}
            </p>
            <p className={`badge badge-${simulation.status}`}>
              {simulation.status}
            </p>
          </div>
          <div className="thirdpartie-container">
            <ThirdPartieCard
              tierId={simulation.demandeur}
              title={'demandeur'}
            />
            <ThirdPartieCard
              tierId={simulation.benneficiaire}
              title={'benneficiaire'}
            />
          </div>

          <h3>Adresse de l'installation</h3>
          <p>
            <strong>Adresse:</strong> {simulation.address}
          </p>
          <h3 className="medium">Dates clefs</h3>
          <div className="formalite-container">
            <CardDate 
              onDateUpdate={(newDate) => handleDateUpdate('dateAccord', newDate)}
            
            title="Date Accord" data={simulation.dateAccord} />
            <CardDate
              onDateUpdate={(newDate) => handleDateUpdate('datePose', newDate)}
            
            title="Date Accompte" data={simulation.datePose} />
            <CardDate
              title="Prev- date de pose"
              onDateUpdate={(newDate) => handleDateUpdate('datePrevisionelPose', newDate)}

              data={simulation.datePrevisionelPose}
            />
            <CardDate title="Date de pose" data={simulation.datePose} />
            <CardDate
              title="Date prev de mise en service"
              onDateUpdate={(newDate) => handleDateUpdate('datePrevisionelMiseEnService', newDate)}

              data={simulation.datePrevisionelMiseEnService}
            />
            <CardDate
              title="Date de mise en service"
              onDateUpdate={(newDate) => handleDateUpdate('dateMiseEnService', newDate)}

              data={simulation.dateMiseEnService}
            />
          </div>
          <h3 className="medium">Etat des démarches</h3>
          <div className="formalite-container">
            {simulation.concessionaire === 'EEC' ? (
              <CardAdministratif
                logo={logoEec}
                title="Demande EEC"
                data={simulation.demandeEEC}
              />
            ) : (
              <CardAdministratif
                logo={logoEnercal}
                title="Demande ENERCAL"
                data={simulation.demandeEnercal}
              />
            )}

            <CardAdministratif
              logo={logoDimenc}
              title="Demande DIMENC"
              data={simulation.demandeDimenc}
            />
            <CardAdministratif
              logo={logoCotsuel}
              title="Demande COTSUEL"
              data={simulation.demandeCotsuel}
            />
          </div>
        </>
      )}

      <div className="comment-modal">
        <h3 className="medium">Commentaires</h3>
        <Modal modalBtn={'+'}>
          <div className="form">
            <label>Titre</label>
            <input
              onChange={(e) => setCommentTitle(e.target.value)}
              placeholder="ajouter un titre"
              value={commentTitle}
              type="text"
            />
            <label>Commentaire</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />
            <button className="btn btn-success" onClick={handleCommentSubmit}>
              Ajouter
            </button>
          </div>
        </Modal>
      </div>

      <div>
        {filteredComments.map((comment) => (
          <div className="comment-box" key={comment.id}>
            <p className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            <h4 className="comment-title">{comment.title}</h4>
            <p className="comment-txt">{comment.content}</p>
            <button
              className="btn btn-danger btn-comment"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimulationDetails
