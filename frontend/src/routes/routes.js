import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Layout from '../Layout';

import Login from '../pages/Login';
import Home from '../pages/Home';
import { AuthProvider } from '../context/auth';



export default function Routes(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" exact component={Login} />
                        <PrivateRoute path="/perfil" component={() => <h1>Você está logado</h1>} />
                        
                    </Switch>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    )
}
