
const connection = require('../database/connection');

module.exports = {
    async index (request,response) {
        const { page = 1 } = request.query;

        const [count] = await connection('anuncios').count();

        const anuncios = await connection('anuncios')
        .join('anunciantes','anunciantes.id','=','anuncios.anunciante_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select(['anuncios.*', 'anunciantes.nome','anunciantes.razao_social','anunciantes.email','anunciantes.telefone','anunciantes.cidade','anunciantes.estado']);

        response.header('total_anuncios', count['count(*)']);
    
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