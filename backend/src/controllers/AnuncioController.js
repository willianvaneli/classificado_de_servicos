
const connection = require('../database/connection');
const { get } = require('../routes');

module.exports = {
    async index (request,response) {
        const anuncios = await connection('anuncios').select('*');
    
        return response.json(anuncios);
    },

    async index (request,response) {
        const anuncios = await connection('anuncios').select('*');
    
        return response.json(anuncios);
    },


    async create(request, response)  {
        const {categoria, valor, descricao} = request.body;
        const anunciante_id = request.headers.anunciante_id;
    
        const [id] = await connection('anuncios').insert({
            categoria, valor, descricao, anunciante_id
        });
    
        return response.json({ result: id })
    },

    async delete (request,response) {
        const {id} = request.params;
        const anunciante_id = request.headers.anunciante_id;

        const anuncio = await connection('anuncios').where('id',id).select('anunciante_id').first();

        if(anuncio == null || anuncio.anunciante_id != anunciante_id){
            return response.status(401).json( {error: 'Operação não permitida'});
        }

        await connection('anuncios').where('id',id).delete();

        return response.status(204).send();
    },


};