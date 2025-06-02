import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setLoading(false);
                setUser(null);
                return;
            }

            try {
                const response = await axios.get(`${config.backend}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error validating token:", error);
                logout();
            } finally {
                setLoading(false);
            }

            console.log("Token validated successfully");
        }

        validateToken();
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        console.log("User logged out");
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 0);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);