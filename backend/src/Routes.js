const express = require('express');

const routes = express.Router();

routes.post('/anunciantes', (request, response) => {
    const body = request.body;

    return response.json({
        result: 'ok'
    })
})

module.exports = routes;