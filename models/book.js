
const mongoose = require('mongoose');

//book schema

let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    img:{
        type: String
    }
    
})


let Book = module.exports = mongoose.model('Book', bookSchema);