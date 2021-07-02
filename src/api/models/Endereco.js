const mongoose = require('../data/index.js')

let enderecoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    lat: Number,
    lng: Number,
    cep: String,
    numero: Number
    
}, {timestamps : true})

let Endereco = mongoose.model('Endereco', enderecoSchema)

module.exports = Endereco