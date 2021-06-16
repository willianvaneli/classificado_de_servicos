const connection = require('../database/connection');

module.exports = {


    async index (request,response) {
        const anunciante_id = request.headers.anunciante_id;
        const anuncios = await connection('anuncios').where('anunciante_id',anunciante_id);

        return response.json(anuncios);
    },

}