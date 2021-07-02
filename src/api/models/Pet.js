const mongoose = require('../data/index.js')

let petSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dono: {
        type: Object,
    },
    raca: {
        type: String
    },
    idade: Number,
    peso: Number

}, {timestamps : true})

let Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
