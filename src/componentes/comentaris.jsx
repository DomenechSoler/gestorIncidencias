import React from 'react'

const Comentaris = ({ comentaris = [] }) => {
  return (
    <div>
      <h5>Comentaris:</h5>
      <ul className="list-group">
        {comentaris.map((comentari, index) => (
          <li key={index} className="list-group-item">{comentari}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comentaris