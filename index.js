//importar o pacote do express 
const express = require("express")

//importar o pacote mongoDB
const mongoose = require("mongoose")

//importar objeto Movie
const Movie = require('./models/Movie')

//inicializar pacote
const server = express()

//configurar porta
mongoose.connect('mongodb+srv://arthurmartinsdev:super123@cluster0.fkeax.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        server.listen(3000, () => {
            console.log("O servidor está conectado ao mongoDB")
        })
    }).catch((erro) => {console.log(erro)})

//Habilitar a leitura e recimento de json -> Middleware (use)
server.use(
    express.urlencoded({
        extended: true,
    })
)

server.use(express.json())

//criar rota inicial
server.get('/', (req,res) => {
    res.json({
        message: "Bem vindo a nossa API com MongoDB"
    })
})

//criar rota para cadastrar filme (post)
server.post('/movie', async(req,res) => {
    //pegar infoirmações da requisição
    const {name, year, streaming} = req.body

    //colocar informações no objeto
    const movie = {
        name,
        year,
        streaming
    }

    try{
        //garantir que os dados foram cadastrados 
        await Movie.create(movie) 

        //resposta
        res.status(201).json({message: 'Filme cadastrado no banco com sucesso!'})
    } catch (erro) {
        res.status(500).json({message: erro})
    }
}) 

//rota para criar filmes cadastrados
server.get('/movies', async(req, res) => {
    //buscar filmes 
    try{
        //.find() [todos os flmes em uma variavel]
        const movies = await Movie.find()

        //mostrar filmes
        res.status(200).json(movies)
    }catch (erro) {
        //retornar erro
        res.status(500).json({message: erro})
    }
})

//atulizar dados [put]
server.put('/movie/:id', async (req,res) => {
    //coletar id
    const id = req.params.id

    //coletar informações do body
    const {name, year, streaming} = req.body

    //armazenar infos
    const movie = {
        name,
        year,
        streaming
    }

    //pesquisar no banco e atualizar
    try{
        const updatedMovie = await Movie.updateOne({_id:id}, movie)

        res.status(200).json({message: "Filme cadastrado com sucesso"})
    }catch (erro) {
        res.status(500).json({message: erro})
    }
})

//deletar filme
server.delete('/movie/:id', async (req, res) => {
    const id = req.params.id

    try{
        const movie = await Movie.findById(id)
        await Movie.deleteOne({_id: id})
        res.status(200).json({message: "O filme foi removido por sucesso"})
    } catch(erro) {
        res.status(500).json({message: erro})
    }
})

//buscar apenas um filme (usando id)
server.get('/movie/:id', async(req, res) => {
    const id = req.params.id

    try{
        const movie = await Movie.findById(id)
        res.status(200).json(movie)
    } catch (erro){
        res.status(500).json({message: erro})
    }
})