/*global require,  module*/
const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"A tour have nust name"],
        unique:true
    },
    rating : {
        type: Number,
        default:4.5 
    },
    price : {
        type: Number,
        required: [true,"A tour have nust price"],
        
    }
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour