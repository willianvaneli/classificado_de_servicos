const connection = require('../database/connection');

module.exports = {
    async index (request,response) {

        const { limit, offset } = request.query.page;
        const { categoria, valor } = request.query.filtros;
        let anuncios;
        let count;
        if(categoria!=null && categoria != "" ){
            anuncios = await connection('anuncios').where('categoria','=',categoria).andWhere('valor','>=',valor[0]).andWhere('valor','<=',valor[1]).offset(offset).limit(limit);
            count = await connection('anuncios').where('categoria','=',categoria).andWhere('valor','>=',valor[0]).andWhere('valor','<=',valor[1]).count('id as count').first();            
        }else{
            anuncios = await connection('anuncios').where('valor','>=',valor[0]).andWhere('valor','<=',valor[1]).offset(offset).limit(limit);
            count = await connection('anuncios').where('valor','>=',valor[0]).andWhere('valor','<=',valor[1]).count('id as count').first();
        }
        const {max} = await connection('anuncios').max('valor as max').first();
        const {min} = await connection('anuncios').min('valor as min').first();

        const data = {
            anuncios,
            count: count.count,
            min,
            max
        }

        return response.json(data);
    },



}