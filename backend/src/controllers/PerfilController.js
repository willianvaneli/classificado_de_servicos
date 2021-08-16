const connection = require('../database/connection');

module.exports = {


    async index (request,response) {
        const anunciante_id = request.headers.anunciante_id;

        const { limit, offset } = request.query.page;
        
        const anuncios = await connection('anuncios').offset(offset).where('anunciante_id',anunciante_id).limit(limit);

        const count = await connection('anuncios').where('anunciante_id',anunciante_id).count('id as count').first();

        const data = {
            anuncios,
            count: count.count
        }

        return response.json(data);
    },

}