const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const connection = require('../database/connection');
const {promisify} = require('util');
const e = require('express');

module.exports = {
    async index (request,response) {
        const { page = 1 } = request.query;
        console.log(request.query);
        const [count] = await connection('anuncios').count();

        const anuncios = await connection('anuncios')
        .join('anunciantes','anunciantes.id','=','anuncios.anunciante_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select(['anuncios.*', 'anunciantes.nome','anunciantes.razao_social','anunciantes.email','anunciantes.telefone','anunciantes.cidade','anunciantes.estado']);

        response.header('total_anuncios', count['count(*)']);
    
        return response.json(anuncios);
    },

    async show (request,response) {
        try {
            const {id} = request.params;

            const anuncio = await connection('anuncios').where('id',id).first();

            const anunciante = await connection('anunciantes').where('id',anuncio.anunciante_id).first();
            
            const data = {
                anuncio,
                anunciante :{
                    nome : anunciante.nome,
                    razao_social : anunciante.razao_social,
                    telefone : anunciante.telefone,
                    cidade : anunciante.cidade,
                    estado : anunciante.estado,

                }
            };
            return response.json(data);
            
        } catch (error) {
            console.log(error.message);
            return response.status(401).json({
                error: true,
                code: 130,
                message: error.message
            })
        }
    },

    async getAnuncio (request,response) {
        let [, token]  = request.headers.authorization.split(' ');
        try {
            let decoded = await promisify(jwt.verify)(token, config.secret);
            console.log(decoded);
            if(!decoded){
                return response.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token est?? expirado!"
                })
            }else {
                
                const {id} = request.params;
                const anunciante_id = decoded.id;

                const anuncio = await connection('anuncios').where('id',id).first();
                if(anuncio == null || anuncio.anunciante_id != anunciante_id){
                    return response.status(401).json( {error: 'Opera????o n??o permitida'});
                }

                return response.json(anuncio);
            }
        } catch (error) {
            console.log(error.message);
            return response.status(401).json({
                error: true,
                code: 130,
                message: "O token ?? inv??lido!"
            })
        }
    },

    async create(request, response)  {
        try {
            let [, token]  = request.headers.authorization.split(' ');
            let decoded = await promisify(jwt.verify)(token, config.secret);
            if(!decoded){
                return response.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token est?? expirado!"
                })
            }else {
                
                const anunciante_id = decoded.id;

                const {categoria, valor, descricao} = request.body.data;
                const [id] = await connection('anuncios').insert({
                    categoria, valor, descricao, anunciante_id
                });

                return response.status(200).json({ success: true});
            }
            
        } catch (error) {
            return response.status(400).json({ error: error});
        }
        
    },

    async update(request, response)  {
        try {
            const {id} = request.params;
            const { categoria, valor, descricao} = request.body.data;
            let [, token]  = request.headers.authorization.split(' ');
            let decoded = await promisify(jwt.verify)(token, config.secret);
            if(!decoded){
                return response.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token est?? expirado!"
                })
            }else {
                const anuncio = await connection('anuncios').where('id',id).first();
                let anunciante_id = decoded.id;
                if(anuncio == null || anuncio.anunciante_id != anunciante_id){
                    return response.status(401).json( {error: 'Opera????o n??o permitida'});
                }

                await connection('anuncios').where('id',id).update({categoria, valor, descricao});

                return response.status(200).json({ success: true});

            }
            
        } catch (error) {
            return response.status(400).json({ error: error});
        }
        
    },

    async delete (request,response) {

        try {
            const {id} = request.params;
            let [, token]  = request.headers.authorization.split(' ');
            let decoded = await promisify(jwt.verify)(token, config.secret);
            if(!decoded){
                return response.status(401).json({
                    error: true,
                    code: 130,
                    message: "O token est?? expirado!"
                })
            }else {
                let anunciante_id = decoded.id;
                const anuncio = await connection('anuncios').where('id',id).select('anunciante_id').first();

                if(anuncio == null || anuncio.anunciante_id != anunciante_id){
                    return response.status(401).json( {error: 'Opera????o n??o permitida'});
                }

                await connection('anuncios').where('id',id).delete();

                return response.status(204).send();
            }
            
        } catch (error) {
            return response.status(400).json({ error: error});
        }        
    },


};