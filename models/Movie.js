//importar pacote do mongoose
const mongoose = require('mongoose')

//criar esqueleto do objeto
const Movie = mongoose.model('Movie', {
    name: String,
    year: Number,
    streaming: Boolean
})

//exportar objeto
module.exports = Movie