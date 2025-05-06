"use client"
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {NextResponse as response} from "next/server";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // Vérifier l'authentification au chargement
    useEffect(() => {
        const token = localStorage.getItem('authtoken');

        if (token) {
            // Vérifier la validité du token auprès de l'API
            fetch('http://localhost:8080/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Token invalide');
                })
                .then(userData => {
                    setUser(userData);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Erreur d\'authentification:', err);
                    localStorage.removeItem('authtoken');
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    // Fonction de connexion
    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur de connexion');
            }

            const data = await res.json();

            // Stocker le token dans localStorage
            localStorage.setItem('authtoken', data.token);
            localStorage.setItem('user', JSON.stringify({
                email: data.email,
                role: data.role
            }));


            // // Récupérer les informations utilisateur
            // const userRes = await fetch('http://localhost:8080/api/users/me', {
            //     headers: {
            //         'Authorization': `Bearer ${data.token}`
            //     }
            // });

            // if (!userRes.ok) {
            //     throw new Error('Erreur lors de la récupération des informations utilisateur');
            // }

            // const userData = await userRes.json();
            // setUser(userData);
            return { success: true , data: data};
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Fonction d'inscription
    const register = async (userData) => {
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Erreur lors de l\'inscription');
            }


            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem('authtoken');
        setUser(null);
        router.push('/');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};