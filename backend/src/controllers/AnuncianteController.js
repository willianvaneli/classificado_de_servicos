
const connection = require('../database/connection');

module.exports = {
    async index (request,response) {
        const anunciantes = await connection('anunciantes').select('*');
    
        return response.json(anunciantes);
    },


    async create(request, response)  {
        const {nome, razao_social, senha, email,telefone, cidade, estado} = request.body;
    
        await connection('anunciantes').insert({
            nome, razao_social, senha, email,telefone, cidade, estado,
        });
    
        return response.json({
            result: 'deu certo'
        })
    }


};