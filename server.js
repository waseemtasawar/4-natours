const dotenv = require('dotenv')
dotenv.config({path:'./congif.env'})
const app = require('./app')


// console.log(process.env)
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})