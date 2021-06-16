const connection = require('../database/connection');

module.exports = {


    async login (request,response) {
        const {id} = request.body;

        const anunciante = await connection('anunciantes').where('id',id).first();
        if(!anunciante){
            return response.status(400).json({ error: 'Anunciante não encontrado '});
        }
        


        return response.json(anunciante);
    },

}