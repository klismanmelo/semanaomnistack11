const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs_id', '=', 'incidents.ongs_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total_count', count['count(*)']);

        return response.json(incidents);
    },
    
    async create(request , response){
        
        const ongs_id = request.headers.autorizo;
        const { title, desciption, value } = request.body;

        const [id] = await connection('incidents').insert({
            title,
            ongs_id,
            desciption,
            value,

        })

    return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ongs_id = request.headers.autorizo;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ongs_id')
            .first();
        
            if(incidents.ongs_id != ongs_id){
                return response.status(401).json({error: 'Operation not Permitted.'});
            }

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();

    }
};