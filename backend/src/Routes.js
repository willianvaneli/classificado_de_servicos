const express = require('express');

const AnuncianteController = require('./controllers/AnuncianteController');
const AnuncioController = require('./controllers/AnuncioController');

const routes = express.Router();

// ANUNCIANTES
routes.get('/anunciantes', AnuncianteController.index);
routes.post('/anunciantes', AnuncianteController.create);
/////

// ANUNCIOS
routes.get('/anuncios', AnuncioController.index);
routes.post('/anuncios', AnuncioController.create);
routes.delete('/anuncios/:id', AnuncioController.delete);
// 

module.exports = routes;