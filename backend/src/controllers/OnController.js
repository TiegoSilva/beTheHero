const crypto = require('crypto')
const connection = require('./../database/connection')

module.exports = { 
    async create(req, response) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX')
    
        console.log(`http://localhost:3000/ongs/`);
    
        await connection('ongs').insert({name,email, whatsapp,city,uf,id})
    
        return response.json({id})
    },
    async list_ongs(req, res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs)
    }
}