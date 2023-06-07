import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser))
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const response = await createSession( email, password )

        console.log('login auth', response.data[0])
        if(response.data[0].resultado === false){
            window.alert('E-mail ou senha errados, tente novamente.')
        }

        const resultado = response.data[0].resultado
        const loggedUser = response.data[0].user
        const token = response.data[0].token

        if(resultado === true){
            localStorage.setItem("user", JSON.stringify(loggedUser))
            localStorage.setItem("token", token)
    
            api.defaults.headers.Authorization = `Bearer ${token}`;
    
            setUser(loggedUser)
            navigate("/perfil")
        }
        else {
            navigate("/login")
        }

        
    }

    const logout = () => {
        console.log('logout')

        localStorage.removeItem("user")
        localStorage.removeItem("token")

        api.defaults.headers.Authorization = null
        
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

