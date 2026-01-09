import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usersAPI } from "../api/api";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    refetch: async () => { }
});

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await usersAPI.getCurrentUser();

            if (response?.user) {
                setUser(response.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        isLoading,
        refetch
    }), [user, isAuthenticated, isLoading, refetch]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
