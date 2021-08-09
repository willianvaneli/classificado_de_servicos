
const connection = require('../database/connection');

module.exports = {
    async index (request,response) {
        const anunciantes = await connection('anunciantes').select('*');
    
        return response.json(anunciantes);
    },


    async create(request, response)  {
        try {
            
            
            const {nome, razao_social, senha, email,telefone, cidade, estado} = request.body;
        
            const tal = await connection('anunciantes').insert({
                nome, razao_social, senha, email,telefone, cidade, estado,
            });
            console.log(tal);
            return response.status(200).json({ success: true});

        } catch (error) {
            console.log(error);
            return response.status(400).json({ error: error});
        }
    }


};