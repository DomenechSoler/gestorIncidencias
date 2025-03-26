import React from 'react'

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

export default TiquetsResolts