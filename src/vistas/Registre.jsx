import { useState } from 'react'

const Registre = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const cambio = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const envio = (e) => {
    e.preventDefault()
    const dades_usuaris = {
      email,
      password,
    }

    const usuarisExistentsString = localStorage.getItem('dades_usuaris')
    const usuarisExistents = usuarisExistentsString ? JSON.parse(usuarisExistentsString) : []

    if (usuarisExistents.some((usuari) => usuari.email === email)) {
      setError('L\'usuari ja existeix.')
      setSuccess('')
    } else {
      usuarisExistents.push(dades_usuaris)
      localStorage.setItem('dades_usuaris', JSON.stringify(usuarisExistents))
      setError('')
      setSuccess('Registre completat amb èxit.')
    }
  }

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Registro</h1>
          <form onSubmit={envio} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <label htmlFor="email" className="mt-2 form-label">User: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={cambio}
            />
    
            <label htmlFor="password" className="mt-2 form-label">Contraseña: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={cambio}
            />
    
            <button type="submit" className="mt-4 w-100 btn btn-primary">Entrar</button>
          </form>
        </div>
      </main>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label> 
              <input className="form-control" defaultValue="Estee es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registre