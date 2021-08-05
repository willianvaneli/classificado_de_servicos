import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import SomeSpinner from '../components/SomeSpinner';

// FUNÇÃO QUE VERIFICA SE O USUÁRIO ESTÁ LOGADO E O REDIRECIONA
const PrivateRoute = ({ component: Component, ...rest}) => {

    const { signed, loading } = useAuth();

    if (loading) {
        return (<SomeSpinner/>);
    }
    
    return (
        <Route { ...rest } render={props =>
            signed ? (
                <Component {...props}/>
                ) : 
                (
                    <Redirect to={{ pathname:'/login', state:{from: props.location } }}/> 
                ) 
            
        }/>
    )
};

export default PrivateRoute;