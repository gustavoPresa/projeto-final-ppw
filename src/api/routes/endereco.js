const { Router } = require('express')
const express = require('express')
const route = express.Router()
const Endereco = require('../models/Endereco')

route.use(express.json())

route.get('/', async function(req, res, next){
    try {
        let filter = {}
        if (req.query.nome){
            filter.nome = req.query.nome
        }
        
        const limit = Math.min(parseInt(req.query.limit), 100) || 100
        const skip = parseInt(req.query.skip) || 0
        
        let enderecos = []

        enderecos = await Endereco.find(filter).limit(limit).skip(skip)

        if(!enderecos.length){
            res.statusCode = 204
            throw new Error()
        }

        res.json(enderecos) 
    } catch (error) {
        next(error)
    }
})

route.get('/:id', async(req,res,next) => {
    try {
        const id = req.params.id
        let endereco = await Endereco.findById(id)
        if(!endereco){
            res.statusCode = 404
            throw new Error ("Nenhum endereco com este id encontrado")
        }
        res.json(endereco)
    } catch (error) {
        next(error)
    }
})

route.post('/', async(req,res,next) => {
    try {
        const endereco =  new Endereco(req.body)
        const resultado = await endereco.save()
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

route.put('/:id', async(req,res,next) => {
    try {
        const id = req.params.id
        const endereco = req.body
        const resultado = await Endereco.findByIdAndUpdate(id,endereco)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

route.delete('/:id', async (req,res,next) =>{
    try{
        const id = req.params.id
        const resultado = await Endereco.findByIdAndDelete(id)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

module.exports = route