import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const login = (user) => {
        setCurrentUser(user)
    }

    const logout = () => {
        setCurrentUser(null)
    }

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}