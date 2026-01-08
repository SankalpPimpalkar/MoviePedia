import { createContext, useContext, useEffect, useState } from "react";
import { usersAPI } from "../api/api";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: false,
})

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await usersAPI.getCurrentUser()
                if (response.user) {
                    setUser(response.user)
                    setIsAuthenticated(true)
                }
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : "Error Occured in Getting User")
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    const values = {
        user,
        isAuthenticated,
        isLoading
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)