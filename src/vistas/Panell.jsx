import { useEffect, useState } from 'react'
import TiquetsPendents from '../componentes/TiquetsPendents'
import TiquetsResolts from '../componentes/TiquetsResolts'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Panell = () => {
  const [tiquetsPendents, setTiquetsPendents] = useState([])
  const [tiquetsResolts, setTiquetsResolts] = useState([])
  const [selectedTiquet, setSelectedTiquet] = useState(null)

  useEffect(() => {
    const storedTiquetsPendents = JSON.parse(localStorage.getItem('tiquetsPendents')) || []
    setTiquetsPendents(storedTiquetsPendents)

    const storedTiquetsResolts = JSON.parse(localStorage.getItem('tiquetsResolts')) || []
    setTiquetsResolts(storedTiquetsResolts)
  }, [])

  const handleCreateTiquet = () => {
    const newTiquet = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      aula: '',
      grupo: '',
      ordenador: '',
      descripcio: '',
      alumno: ''
    }
    setTiquetsPendents([...tiquetsPendents, newTiquet])
    localStorage.setItem('tiquetsPendents', JSON.stringify([...tiquetsPendents, newTiquet]))
  }

  const handleResolveTiquet = (index) => {
    const tiquet = tiquetsPendents[index]
    tiquet.fechaResolucion = new Date().toLocaleDateString()
    const updatedPendents = tiquetsPendents.filter((_, i) => i !== index)
    setTiquetsPendents(updatedPendents)
    setTiquetsResolts([...tiquetsResolts, tiquet])
    localStorage.setItem('tiquetsPendents', JSON.stringify(updatedPendents))
    localStorage.setItem('tiquetsResolts', JSON.stringify([...tiquetsResolts, tiquet]))
  }

  const handleDeleteTiquet = (index) => {
    const updatedPendents = tiquetsPendents.filter((_, i) => i !== index)
    setTiquetsPendents(updatedPendents)
    localStorage.setItem('tiquetsPendents', JSON.stringify(updatedPendents))
  }

  const handleEditTiquet = (index) => {
    setSelectedTiquet(tiquetsPendents[index])
  }

  const handleSaveChanges = () => {
    const updatedPendents = tiquetsPendents.map(tiquet => 
      tiquet.id === selectedTiquet.id ? selectedTiquet : tiquet
    )
    setTiquetsPendents(updatedPendents)
    localStorage.setItem('tiquetsPendents', JSON.stringify(updatedPendents))
    setSelectedTiquet(null)
  }

  return (
    <div>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <h2 className="mt-5">Tickets pendientes <button className="btn btn-primary" onClick={handleCreateTiquet}>Crear Ticket</button></h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tiquetsPendents.map((tiquet, index) => (
              <tr key={index}>
                <td>{tiquet.id}</td>
                <td>{tiquet.fecha}</td>
                <td>{tiquet.aula}</td>
                <td>{tiquet.grupo}</td>
                <td>{tiquet.ordenador}</td>
                <td>{tiquet.descripcio}</td>
                <td>{tiquet.alumno}</td>
                <td><button className="btn btn-success" title="Resolver ticket" onClick={() => handleResolveTiquet(index)}>Resolver</button></td>
                <td><button className="btn btn-warning" title="Añadir comentario" onClick={() => handleEditTiquet(index)}><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button></td>
                <td><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></td>
                <td><button className="btn btn-danger" title="Eliminar ticket" onClick={() => handleDeleteTiquet(index)}><i className="bi bi-trash3"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-5">Tickets resueltos</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Fecha resuelto</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
            </tr>
          </thead>
          <tbody>
            {tiquetsResolts.map((tiquet, index) => (
              <tr key={index}>
                <td>{tiquet.id}</td>
                <td>{tiquet.fecha}</td>
                <td>{tiquet.fechaResolucion}</td>
                <td>{tiquet.aula}</td>
                <td>{tiquet.grupo}</td>
                <td>{tiquet.ordenador}</td>
                <td>{tiquet.descripcion}</td>
                <td>{tiquet.alumno}</td>
                <td><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></td>
                <td><button className="btn btn-danger" title="Eliminar ticket"><i className="bi bi-trash3"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {selectedTiquet && (
        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedTiquet(null)}></button>
              </div>
              <div className="modal-body">
                <p>Código incidencia: <span>{selectedTiquet.id}</span></p>
                <label htmlFor="aula" className="form-label">Aula:</label>
                <input className="form-control" value={selectedTiquet.aula} onChange={(e) => setSelectedTiquet({ ...selectedTiquet, aula: e.target.value })} />
                <label htmlFor="grupo" className="form-label">Grupo:</label>
                <input className="form-control" value={selectedTiquet.grupo} onChange={(e) => setSelectedTiquet({ ...selectedTiquet, grupo: e.target.value })} />
                <label htmlFor="ordenador" className="form-label">Ordenador:</label>
                <input className="form-control" value={selectedTiquet.ordenador} onChange={(e) => setSelectedTiquet({ ...selectedTiquet, ordenador: e.target.value })} />
                <label htmlFor="comentario" className="form-label">Comentario:</label>
                <input className="form-control" value={selectedTiquet.descripcio} onChange={(e) => setSelectedTiquet({ ...selectedTiquet, descripcio: e.target.value })} />
                <p className="small text-end">Autor: <span>{selectedTiquet.alumno}</span></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setSelectedTiquet(null)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Panell