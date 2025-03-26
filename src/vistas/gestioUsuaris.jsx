import { useState, useEffect } from "react"

const GestioUsuaris = () => {
  const [usuaris, setUsuaris] = useState([])

  useEffect(() => {
    const dadesUsuaris =
      JSON.parse(localStorage.getItem("dades_usuaris")) || []
    setUsuaris(dadesUsuaris)
  }, [])

  const handleRoleChange = (index, newRole) => {
    const updatedUsuaris = usuaris.map((usuari, i) =>
      i === index ? { ...usuari, role: newRole } : usuari
    )
    setUsuaris(updatedUsuaris)
    localStorage.setItem("dades_usuaris", JSON.stringify(updatedUsuaris))
  }

  return (
    <main className="container mt-5">
      <h1 className="w-100 text-center">Gestió de Usuaris</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuaris.map((usuari, index) => (
            <tr key={index}>
              <td>{usuari.email}</td>
              <td>
                <select
                  value={usuari.role || "user"}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  className="form-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default GestioUsuaris
