const express = require("express")
const fs = require("fs")
const app = express();



const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// MiddleWares
app.use(express.json())

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
const getAllTours =(req, res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestTime:req.requestTime,
        data:{
            tours
        }
    })
}


const getTour = (req, res)=>{
    // console.log(req.params)

    const id = req.params.id*1
    
    if(id > tours.length){
        res.status(404).json({
            status: "fail",
            message:"there is No Is ID"
        })
    }
    const tour = tours.find(el=> el.id === id )

    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    })
}


const addTour = (req, res)=>{
    // console.log(req.body)
    const newId = tours[tours.length -1].id+1;
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
 err =>{
    res.status(201).json({
        status:'success',
        data:{
            tours: newTour
        }
    })
 }
)}

const updateTour = (req, res)=>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    
        res.status(200).json({
            status:"success",
            data:{
                tour:"<Updates tour>"
            }
        })
    }

const deleteTour = (req, res)=>{
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    
        res.status(204).json({
            status:"success",
            data:null
        })
    }

    


app.get('/',indexPage)
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours',addTour)
// app.get('/api/v1/tours/:id',getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)
   
// routs
app.route('/api/v1/tours').get(getAllTours).post(addTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)



Srever:
const port = 3000

app.listen(port, ()=>{
    console.log(`App is listen on Port ${port} ..`)
})