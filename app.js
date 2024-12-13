const express = require("express")
const fs = require("fs")
const app = express();
app.use(express.json())
app.get('/',(req, res)=>{
  res.status(200).json({message:"Hello from server",
    app:'Natours'
  })
})
// app.post('/',(req, res)=>{
//   res.status(200).send("you can write post at this endpoint")
// })

const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours',(req, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data:{
            tours
        }
    })
})

app.post('/api/v1/tours',(req, res)=>{
    console.log(req.body)
    res.send("Done")
})



const port = 3000

app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})