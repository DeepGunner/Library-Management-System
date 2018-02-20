const mongoose = require('mongoose');

//Employee schema

let employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
    
})


let Employee = module.exports = mongoose.model('Employee', employeeSchema);