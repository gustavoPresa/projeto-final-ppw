const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const rotasEndereco =  require ('./api/routes/endereco')
const rotasPet =  require ('./api/routes/pet')

app.use('/enderecos', rotasEndereco)
app.use('/pets', rotasPet)

app.use((err,req,res,next) => {
    if(res.statusCode == 200){
        res.statusCode = 500
        res.json({erro: err.message})
    }
    else {
        res.send()
    }
})

app.listen(PORT, () =>{
    console.log('Servidor iniciado na porta '+ PORT)
})