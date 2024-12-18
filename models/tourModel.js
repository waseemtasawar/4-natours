/*global require,  module*/
const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"A tour have nust name"],
        unique:true,
        trim: true
    },
    duration:{
        type:Number,
        required: [true, "A tour must have durations"]
    },
    maxGroupSize:{
        type:Number,
        required: [true, "A tour must have Group Size"]
    },
    difficulty:{
        type:String,
        required: [true, "A tour must have difficulty"]
    },
    ratingsAverage : {
        type: Number,
        default:4.5 
    },
    ratingsQuantity : {
        type: Number,
        default:0 
    },
    price : {
        type: Number,
        required: [true,"A tour have nust price"],
        
    },
    priceDiscount:Number,
    summary:{
        type:String,
        trim: true,
        required:[true, "A tour must have description"]
    },
    description:{
        type:String,
        trim: true
    },
    imageCover:{
        type:String,
        required:[true, "A tour must have cover Image"]
    },
    images:[String],
    createdAy:{
        type:Date,
        default:Date.now()
    },
    startDates:[Date]
    
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour