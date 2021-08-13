
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

    async getAnuncio (request,response) {
        
        const {id} = request.params;
        const anunciante_id = request.headers.anunciante_id;

        const anuncio = await connection('anuncios').where('id',id).first();
        console.log(anuncio);
        if(anuncio == null || anuncio.anunciante_id != anunciante_id){
            return response.status(401).json( {error: 'Operação não permitida'});
        }

        return response.json(anuncio);
    },

    async create(request, response)  {
        try {
            const {anunciante_id, categoria, valor, descricao} = request.body.data;
            const [id] = await connection('anuncios').insert({
                categoria, valor, descricao, anunciante_id
            });

            return response.status(200).json({ success: true});
        } catch (error) {
            return response.status(400).json({ error: error});
        }
        
    },

    async update(request, response)  {
        try {
            const {id} = request.params;
            const {anunciante_id, categoria, valor, descricao} = request.body.data;

            const anuncio = await connection('anuncios').where('id',id).first();
            
            if(anuncio == null || anuncio.anunciante_id != anunciante_id){
                return response.status(401).json( {error: 'Operação não permitida'});
            }

            await connection('anuncios').where('id',id).update({categoria, valor, descricao});

            return response.status(200).json({ success: true});
        } catch (error) {
            return response.status(400).json({ error: error});
        }
        
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