import PropTypes from 'prop-types'

const TiquetsResolts = ({ tiquetsResolts, handleViewComments, handleDeleteTiquet }) => {
    return (
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
                    <th></th>
                    <th></th>
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
                        <td><button className="btn btn-info" title="Ver comentarios" onClick={() => handleViewComments(index)}><i className="bi bi-chat-left-text" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button></td>
                        <td><button className="btn btn-danger" title="Eliminar ticket" onClick={() => handleDeleteTiquet(index)}><i className="bi bi-trash3"></i></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

TiquetsResolts.propTypes = {
    tiquetsResolts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            fecha: PropTypes.string.isRequired,
            fechaResolucion: PropTypes.string.isRequired,
            aula: PropTypes.string.isRequired,
            grupo: PropTypes.string.isRequired,
            ordenador: PropTypes.string.isRequired,
            descripcion: PropTypes.string.isRequired,
            alumno: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleViewComments: PropTypes.func.isRequired,
    handleDeleteTiquet: PropTypes.func.isRequired,
}

export default TiquetsResolts