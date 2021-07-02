const { Router } = require('express')
const express = require('express')
const route = express.Router()
const Pet = require('../models/Pet')
const axios = require('axios')

route.use(express.json())

route.get('/', async function(req, res, next){
    try {
        let filter = {}
        if (req.query.nome){
            filter.nome = req.query.nome
        }

        const limit = Math.min(parseInt(req.query.limit), 100) || 100
        const skip = parseInt(req.query.skip) || 0
        
        let pets = []

        pets = await Pet.find(filter).limit(limit).skip(skip)

        if(!pets.length){
            res.statusCode = 204
            throw new Error()
        }
        res.json(pets) 
    } catch (error) {
        next(error)
    }
})

route.get('/:id', async(req,res,next) => {
    try {
        const id = req.params.id
        let pet = await Pet.findById(id)
        if(!pet){
            res.statusCode = 404
            throw new Error ("Nenhum pet com este id encontrado")
        }

        
        if(pet.dono && req.query.mostrar==="true") {            
            try {
                var dono = await axios.get('https://ppw2-final.herokuapp.com/donos/'+pet.dono)
                if(dono.status === 200) {
                    pet.dono = dono.data  
                }    
            } catch (error) {
                console.log('f')
            }           
        }

        res.json(pet)
    } catch (error) {
        next(error)
    }
})

route.post('/', async(req,res,next) => {
    try {
        const pet =  new Pet(req.body)
        const resultado = await pet.save()
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

route.put('/:id', async(req,res,next) => {
    try {
        const id = req.params.id
        const pet = req.body
        const resultado = await Pet.findByIdAndUpdate(id,pet)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

route.delete('/:id', async (req,res,next) =>{
    try{
        const id = req.params.id
        const resultado = await Pet.findByIdAndDelete(id)
        res.json(resultado)
    } catch (error) {
        next(error)
    }
})

module.exports = route