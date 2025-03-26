import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Header = () => {
    const { currentUser, logout } = useContext(UserContext)

    return (
        <header>
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
            <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
            <div>
                <Link to="/panell" className="btn btn-secondary ms-2">PANEL</Link>
                <Link to="/inici-sessio" className="btn btn-secondary ms-2">LOGIN</Link>
                <Link to="/registre" className="btn btn-secondary ms-2">REGISTRO</Link>
                <Link to="/gestio-usuaris" className="btn btn-secondary ms-2">GESTIÓ USUARIS</Link> {/* Afegeix l'enllaç a la gestió d'usuaris */}
            </div>
            <div>
                {currentUser ? (
                <>
                    <span>{currentUser.email}</span>
                    <button onClick={logout} className="btn btn-secondary ms-2">Logout</button>
                </>
                ) : (
                <span>Not logged in</span>
                )}
            </div>
            </div>
        </nav>
        </header>
    )
}

export default Header