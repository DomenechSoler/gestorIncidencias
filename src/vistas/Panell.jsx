import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import TiquetsPendents from '../componentes/TiquetsPendents'
import TiquetsResolts from '../componentes/TiquetsResolts'
import Comentari from '../componentes/comentari'
import Comentaris from '../componentes/comentaris'
import 'bootstrap-icons/font/bootstrap-icons.css'
import NouTicket from './NouTicket'

const Panell = () => {
  const { currentUser } = useContext(UserContext) 
  const [tiquetsPendents, setTiquetsPendents] = useState([])
  const [tiquetsResolts, setTiquetsResolts] = useState([])
  const [selectedTiquet, setSelectedTiquet] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [showNouTicketModal, setShowNouTicketModal] = useState(false)

  useEffect(() => {
    const storedTiquetsPendents = JSON.parse(localStorage.getItem('dades_tiquets')) || []
    setTiquetsPendents(storedTiquetsPendents)

    const storedTiquetsResolts = JSON.parse(localStorage.getItem('tiquetsResolts')) || []
    setTiquetsResolts(storedTiquetsResolts)
  }, [])

  const handleCreateTiquet = () => {
    setShowNouTicketModal(true)
  }

  const handleSaveNouTicket = (nouTiquet) => {
    const updatedTiquetsPendents = [...tiquetsPendents, nouTiquet]
    setTiquetsPendents(updatedTiquetsPendents)
    localStorage.setItem('dades_tiquets', JSON.stringify(updatedTiquetsPendents))
    setShowNouTicketModal(false)
  }

  const handleResolveTiquet = (index) => {
    const tiquet = tiquetsPendents[index]
    tiquet.fechaResolucion = new Date().toLocaleDateString()
    const updatedPendents = tiquetsPendents.filter((_, i) => i !== index)
    setTiquetsPendents(updatedPendents)
    setTiquetsResolts([...tiquetsResolts, tiquet])
    localStorage.setItem('dades_tiquets', JSON.stringify(updatedPendents))
    localStorage.setItem('tiquetsResolts', JSON.stringify([...tiquetsResolts, tiquet]))
  }

  const handleDeleteTiquet = (index, isResolved) => {
    if (isResolved) {
      const updatedResolts = tiquetsResolts.filter((_, i) => i !== index)
      setTiquetsResolts(updatedResolts)
      localStorage.setItem('tiquetsResolts', JSON.stringify(updatedResolts))
    } else {
      const updatedPendents = tiquetsPendents.filter((_, i) => i !== index)
      setTiquetsPendents(updatedPendents)
      localStorage.setItem('dades_tiquets', JSON.stringify(updatedPendents))
    }
  }

  const handleEditTiquet = (index, isResolved) => {
    setSelectedTiquet(isResolved ? tiquetsResolts[index] : tiquetsPendents[index])
    setShowComments(false)
  }

  const handleViewComments = (index, isResolved) => {
    setSelectedTiquet(isResolved ? tiquetsResolts[index] : tiquetsPendents[index])
    setShowComments(true)
  }

  const handleSaveChanges = () => {
    const updatedPendents = tiquetsPendents.map((tiquet) =>
      tiquet.id === selectedTiquet.id ? selectedTiquet : tiquet
    )
    setTiquetsPendents(updatedPendents)
    localStorage.setItem('dades_tiquets', JSON.stringify(updatedPendents))
    setSelectedTiquet(null)
  }

  const handleAddComentari = (text) => {
    const updatedTiquet = {
      ...selectedTiquet,
      comentaris: Array.isArray(selectedTiquet.comentaris) ? [...selectedTiquet.comentaris, text] : [text]
    }
    setSelectedTiquet(updatedTiquet)
    const updatedPendents = tiquetsPendents.map((tiquet) =>
      tiquet.id === updatedTiquet.id ? updatedTiquet : tiquet
    )
    setTiquetsPendents(updatedPendents)
    localStorage.setItem('dades_tiquets', JSON.stringify(updatedPendents))
  }

  return (
    <div>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        {currentUser?.role === "admin" && (
          <h2 className="mt-5">
            Tickets pendientes{" "}
            <button className="btn btn-primary" onClick={handleCreateTiquet}>
              Crear Ticket
            </button>
          </h2>
        )}
        <TiquetsPendents
          tiquetsPendents={tiquetsPendents}
          handleResolveTiquet={
            currentUser?.role === "admin" ? handleResolveTiquet : null
          }
          handleEditTiquet={(index) => handleEditTiquet(index, false)}
          handleViewComments={(index) => handleViewComments(index, false)}
          handleDeleteTiquet={
            currentUser?.role === "admin"
              ? (index) => handleDeleteTiquet(index, false)
              : null
          }
        />

        <h2 className="mt-5">Tickets resueltos</h2>
        <TiquetsResolts
          tiquetsResolts={tiquetsResolts}
          handleViewComments={(index) => handleViewComments(index, true)}
          handleDeleteTiquet={
            currentUser?.role === "admin"
              ? (index) => handleDeleteTiquet(index, true)
              : null
          }
        />
      </main>
      {selectedTiquet && showComments && (
        <div
          className="modal fade show"
          id="viewCommentsModal"
          tabIndex="-1"
          aria-labelledby="viewCommentsModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewCommentsModalLabel">
                  Comentaris
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedTiquet(null)}
                ></button>
              </div>
              <div className="modal-body">
                <Comentaris comentaris={selectedTiquet.comentaris || []} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedTiquet(null)}
                >
                  Tancar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTiquet && !showComments && (
        <div
          className="modal fade show"
          id="addCommentModal"
          tabIndex="-1"
          aria-labelledby="addCommentModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addCommentModalLabel">
                  Afegir Comentari
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedTiquet(null)}
                ></button>
              </div>
              <div className="modal-body">
                <Comentari onAddComentari={handleAddComentari} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedTiquet(null)}
                >
                  Tancar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNouTicketModal && (
        <div
          className="modal fade show"
          id="nouTicketModal"
          tabIndex="-1"
          aria-labelledby="nouTicketModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="nouTicketModalLabel">
                  Crear Nuevo Ticket
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowNouTicketModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <NouTicket
                  dades_tiquets={tiquetsPendents}
                  setDadesTiquets={handleSaveNouTicket}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Panell