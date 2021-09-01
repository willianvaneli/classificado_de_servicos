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
import EdicaoAnuncio from '../pages/EdicaoAnuncio'
import VisualizarAnuncio from '../pages/VisualizarAnuncio';



export default function Routes(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/cadastro" component={CadastroAnunciante} />
                        <Route path="/anuncios/show/:id" component={VisualizarAnuncio} />
                        <PrivateRoute exact path="/perfil" component={Perfil} />
                        <PrivateRoute exact path="/perfil/anuncios" component={CadastroAnuncio} />
                        <PrivateRoute path="/perfil/anuncios/:id" component={EdicaoAnuncio} />
                        
                    </Switch>
                </Layout>
            </AuthProvider>
        </BrowserRouter>
    )
}
