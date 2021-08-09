import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Layout from '../Layout';

import { AuthProvider } from '../context/auth';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Cadastro from '../pages/Cadastro';



export default function Routes(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/cadastro" component={Cadastro} />
                        <PrivateRoute path="/perfil" component={Perfil} />
                        
                    </Switch>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    )
}
