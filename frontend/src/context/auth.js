import React, { createContext, useState, useEffect, useCallback } from 'react';
import { signInService } from '../services/auth';
import useLocalStorage from '../hooks/useLocalStorage';
import api from "../services/api";

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    
    const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
    const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (storageUser && storageToken) {
            setUser(storageUser);
            api.defaults.headers.Authorization = `Baerer ${storageToken}`;
        }
        setLoading(false);        
    }, []);


    const signIn = useCallback( async (data) => {
    
        setLoading(true);
        const response = await signInService(data);
        setUser(response.data.anunciante);
        api.defaults.headers.Authorization = `Baerer ${response.token}`;
        setStorageUser(response.data.anunciante);
        setStorageToken(response.data.token);
        setLoading(false);
    }, []);

    
    const signOut = useCallback( () => {
    
        setLoading(true);
        removeStorageUser();
        removeStorageToken();
        setUser({});
        setLoading(false);
    }, []);

    
    return (

        <AuthContext.Provider value={{ 
            signed: (user && user.nome) ? true : false, 
            user, 
            signIn, 
            signOut, 
            loading 
        }}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthContext;