import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Layout from '../Layout';

import { AuthProvider } from '../context/auth';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import CadastroAnunciante from '../pages/CadastroAnunciante';
import CadastroAnuncio from '../pages/CadastroAnuncio';



export default function Routes(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/cadastro" component={CadastroAnunciante} />
                        <PrivateRoute exact path="/perfil" component={Perfil} />
                        <PrivateRoute path="/perfil/anuncios" component={CadastroAnuncio} />
                        
                    </Switch>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    )
}
