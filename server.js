/*global require,  process, */
const dotenv = require('dotenv')
const app = require('./app')
const mongoose = require('mongoose')
dotenv.config({path:'./congif.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
// const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("DB connected Successfully")
}).catch((error)=>{
    console.log("DB is not Connected", error)
})

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

const testTour = new Tour({
    name:"THe First tour",
    rating:4.6,
    price:567
})
 testTour.save().then(doc=>{
    console.log("Data Added to DataBase", doc)
 }).catch(error=>{
    console.log("Filed to Add Data in DataBase")
 })

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})