const express = require('express')
const server = express()

server.listen(3000, () =>{
    console.log("Servidor esta funcionando")
})

server.get('/', (req,res) =>{
    return res.json({mensagem: "Está funcionado"})
})

server.get('/churros', (req,res) =>{
    return res.json({mensagem: "Chrurros é bom"})
}) 