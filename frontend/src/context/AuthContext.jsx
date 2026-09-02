import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // Récupérer l'utilisateur connecté
    const getUser = async (authToken = token) => {
        if (!authToken) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setUser(response.data.user);
        } catch (error) {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (email, password) => {
        const response = await api.post("/login", {
            email,
            password,
        });

        const newToken = response.data.token;

        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(response.data.user);

        return response.data;
    };

    // Register
    const register = async (
        name,
        email,
        password,
        password_confirmation,
        department_id = null
    ) => {
        const response = await api.post("/register", {
            name,
            email,
            password,
            password_confirmation,
            department_id,
        });

        const newToken = response.data.token;

        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(response.data.user);

        return response.data;
    };

    // Logout
    const logout = async () => {
        try {
            await api.post(
                "/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}