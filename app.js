const express = require("express")
const fs = require("fs")
const app = express();

// app.get('/',(req, res)=>{
//   res.status(200).json({message:"Hello from server",
//     app:'Natours'
//   })
// })
// app.post('/',(req, res)=>{
//   res.status(200).send("you can write post at this endpoint")
// })

const tours = fs.readFileSync(`${__dirname}/dev-data/data`)



const port = 3000

app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})