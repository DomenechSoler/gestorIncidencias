import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const IniciSessio = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('dades_usuaris')) || []
    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      login(user)
      navigate('/panell')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
          <label htmlFor="email" className="mt-2 form-label">User: </label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
  
          <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  
          <button type="submit" className="mt-4 w-100 btn btn-primary">Entrar</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </main>
  )
}

export default IniciSessio