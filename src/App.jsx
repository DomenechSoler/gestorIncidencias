import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Registre from './vistas/Registre'
import Panell from './vistas/Panell'
import IniciSessio from './vistas/IniciSessio'
import Header from './componentes/header'
import { UserProvider } from './context/UserContext'

function App() {
  useEffect(() => {
    // Inicializa la colección de tiquets si no existe
    if (!localStorage.getItem('dades_tiquets')) {
      localStorage.setItem('dades_tiquets', JSON.stringify([]))
    }

    // Inicializa la colección de usuaris si no existe
    if (!localStorage.getItem('dades_usuaris')) {
      localStorage.setItem('dades_usuaris', JSON.stringify([]))
    }
  }, [])

  return (
    <UserProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/registre" element={<Registre />} />
            <Route path="/panell" element={<Panell />} />
            <Route path="/inici-sessio" element={<IniciSessio />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App