const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(Request,response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(Request, response) {
        const { name, email, whatsapp, city, uf } = Request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};