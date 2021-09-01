const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const {promisify} = require('util');
const connection = require('../database/connection');

module.exports = {


    async index (request,response) {
        let [, token]  = request.headers.authorization.split(' ');
        try {
            let decoded = await promisify(jwt.verify)(token, config.secret);
            if(!decoded){
                return response.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token está expirado!"
                })
            }else {
                const anunciante_id = decoded.id;
                const { limit, offset } = request.query.page;
            
                const anuncios = await connection('anuncios').offset(offset).where('anunciante_id',anunciante_id).limit(limit);
    
                const count = await connection('anuncios').where('anunciante_id',anunciante_id).count('id as count').first();
    
                const data = {
                    anuncios,
                    count: count.count
                }
    
                return response.json(data);
                
            }
            
        } catch (error) {
            console.log(error.message);
            return response.status(401).json({
                error: true,
                code: 130,
                message: "O token é inválido!"
            })
        }
        
    },

}