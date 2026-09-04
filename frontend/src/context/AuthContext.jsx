import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/user");
            setUser(response.data.user || response.data);
        } catch (error) {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

const login = async (email, password) => {
    const response = await api.post("/login", {
        email,
        password,
    });

    const newToken = response.data.token;
    const loggedUser = response.data.user;

    localStorage.setItem("token", newToken);

    setToken(newToken);
    setUser(loggedUser);

    return loggedUser;
};

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

    const logout = async () => {
        try {
            if (localStorage.getItem("token")) {
                await api.post("/logout");
            }
        } catch (error) {
            console.log("Logout error:", error.response?.data);
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