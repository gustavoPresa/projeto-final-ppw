const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:123@cluster0.pde65.mongodb.net/ppw?retryWrites=true&w=majority", {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', function(){
    console.log("Conectado com o banco de dados")
})

module.exports = mongoose