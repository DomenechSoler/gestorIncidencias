import { useState } from 'react'

const NouTicket = ({ dades_tiquets, setDadesTiquets }) => {
    const [aula, setAula] = useState('')
    const [ordenador, setOrdenador] = useState('') 
    const [descripcion, setDescripcion] = useState('')
    const [grupo, setGrupo] = useState('')
    const [alumno, setAlumno] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const nouTiquet = {
            id: dades_tiquets.length + 1, 
            fecha: new Date().toLocaleDateString(), 
            aula,
            ordenador, 
            descripcion,
            grupo,
            alumno
        }
        setDadesTiquets(nouTiquet)
        setAula('')
        setOrdenador('') 
        setDescripcion('')
        setGrupo('')
        setAlumno('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="aula" className="form-label">Aula:</label>
                <input
                    type="text"
                    className="form-control"
                    id="aula"
                    value={aula}
                    onChange={(e) => setAula(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="ordenador" className="form-label">Ordenador:</label>
                <input
                    type="text"
                    className="form-control"
                    id="ordenador"
                    value={ordenador} 
                    onChange={(e) => setOrdenador(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripció:</label>
                <textarea
                    className="form-control"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="grupo" className="form-label">Grupo:</label>
                <input
                    type="text"
                    className="form-control"
                    id="grupo"
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="alumno" className="form-label">Alumno:</label>
                <input
                    type="text"
                    className="form-control"
                    id="alumno"
                    value={alumno}
                    onChange={(e) => setAlumno(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Afegir Tiquet</button>
        </form>
    )
}

export default NouTicket