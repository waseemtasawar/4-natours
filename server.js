/*global require,  process, */
const dotenv = require('dotenv')
const app = require('./app')
const mongoose = require('mongoose')
dotenv.config({path:'./.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
// const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("DB connected Successfully")
}).catch((error)=>{
    console.log("DB is not Connected", error)
})





const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})