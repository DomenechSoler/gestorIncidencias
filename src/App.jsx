import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Registre from './vistas/Registre'
import Panell from './vistas/Panell'
import IniciSessio from './vistas/IniciSessio'

function App() {


  return (
    <Router>
      <div>
        <nav>
          <Link to="/registre">Registro</Link>
          <Link to="/panell">Panel</Link>
          <Link to="/inici-sessio">Login</Link>
        </nav>
        <Routes>
          <Route path="/registre" element={<Registre />} />
          <Route path="/panell" element={<Panell />} />
          <Route path="/inici-sessio" element={<IniciSessio />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App