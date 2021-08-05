const connection = require('../database/connection');
const config = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {


    async login (request,response) {
        console.log(request.data);
        console.log("\n--------\n");
        const {email, senha} = request.body;
        

        const anunciante = await connection('anunciantes').where('email',email).first();
        if(!anunciante){
            return response.status(400).json({ error: 'Anunciante não encontrado '});
        }
        if(anunciante.senha != senha){
            return response.status(400).json({ 
                error: 'Senha inválida'
            });
        }



        return response.status(200).json({
            anunciante:{
                nome: anunciante.nome,
                email: anunciante.email
            },
            token: jwt.sign(
                {id: anunciante.id},
                config.secret,
                {expiresIn: config.expiresIn}) 
        });
    },

}