const express = require('express');

const AnuncianteController = require('./controllers/AnuncianteController');
const AnuncioController = require('./controllers/AnuncioController');
const PerfilController = require('./controllers/PerfilController');
const SessaoController = require('./controllers/SessaoController');
const HomeController = require('./controllers/HomeController');
const AuthMidleware = require('./Midlewares/AuthMidleware');

const routes = express.Router();

// ANUNCIANTES
routes.get('/anunciantes', AuthMidleware, AnuncianteController.index);
routes.post('/anunciantes', AnuncianteController.create);
/////

// ANUNCIOS
routes.get('/anuncios', AnuncioController.index);
routes.get('/anuncios/:id', AnuncioController.getAnuncio);
routes.get('/anuncios/show/:id', AnuncioController.show);
routes.post('/anuncios', AuthMidleware, AnuncioController.create);
routes.delete('/anuncios/:id', AuthMidleware, AnuncioController.delete);
routes.put('/anuncios/:id', AuthMidleware, AnuncioController.update);
// 

// PERFIL
routes.get('/perfil', AuthMidleware, PerfilController.index);
//

// PERFIL
routes.get('/home', HomeController.index);
//

// SEÇÃO
routes.post('/login', SessaoController.login);
//

module.exports = routes;