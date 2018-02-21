const mongoose = require('mongoose');

//Employee schema

let employeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
    
})

let Employee = module.exports = mongoose.model('Employee', employeeSchema);