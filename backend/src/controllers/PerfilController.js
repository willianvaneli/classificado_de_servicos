const connection = require('../database/connection');

module.exports = {


    async index (request,response) {
        const anunciante_id = request.headers.anunciante_id;

        
        const data = await connection('anuncios').where('anunciante_id',anunciante_id);

        return response.json(data);
    },

}