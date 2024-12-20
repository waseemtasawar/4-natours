/*global require, __dirname, module, process*/
const express = require("express")
const app = express();
app.use(express.json())
const morgin = require('morgan')

if(process.env.NODE_ENV=== 'development'){
    app.use(morgin('dev'))
}

app.use(express.static(`${__dirname}/public`))

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// MiddleWares

app.use((req, res, next)=>{
    console.log("Hello from MiddleWare")
    next()
})
app.use((req, res, next)=>{
    req.requestTime= new Date().toISOString()
    next()
})

const indexPage = (req, res)=>{
    res.status(200).json({message:"Hello from server",
      app:'Natours'
    })
  }
// Route Handles

app.get('/',indexPage)
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours',addTour)
// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)
   
// routs



app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//Srever:
module.exports = app;