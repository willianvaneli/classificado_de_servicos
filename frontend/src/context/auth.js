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
        api.defaults.headers.Authorization = `Baerer ${response.data.token}`;
        await setStorageUser(response.data.anunciante);
        await setStorageToken(response.data.token);
        setUser(response.data.anunciante);
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