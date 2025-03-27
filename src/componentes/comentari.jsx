import { useState } from 'react'

const Comentari = ({ onAddComentari }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddComentari(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="comentari" className="form-label">Afegir Comentari:</label>
        <input
          type="text"
          className="form-control"
          id="comentari"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Afegir</button>
    </form>
  )
}

import PropTypes from 'prop-types'

Comentari.propTypes = {
  onAddComentari: PropTypes.func.isRequired,
}

export default Comentari