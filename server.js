/*global require, process,*/
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path:'./congif.env'})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})