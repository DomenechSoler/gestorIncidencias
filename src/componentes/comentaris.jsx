import PropTypes from 'prop-types'

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

// Validación de las props con PropTypes
Comentaris.propTypes = {
  comentaris: PropTypes.arrayOf(PropTypes.string),
}

export default Comentaris