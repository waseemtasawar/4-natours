/*global require, __dirname, exports, */
const fs = require('fs')
const tours = JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


exports.checkId = (req, res, next, val)=>{
      console.log(`The Tour Id is ${val}`)
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    next()
}

exports.checkbody = (req, res, next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"fail",
            message:"The Name or Price is Missing"
        })
    }
    next()
}

exports.getAllTours =(req, res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestTime:req.requestTime,
        data:{
            tours
        }
    })
}
exports.getTour = (req, res)=>{
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


exports.addTour = (req, res)=>{
    console.log(req.body)
    const newId = tours[tours.length -1].id+1;
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
 () =>{
    res.status(201).json({
        status:'success',
        data:{
            tours: newTour
        }
    })
 }
)}

exports.updateTour = (req, res)=>{   
        res.status(200).json({
            status:"success",
            data:{
                tour:"<Updates tour>"
            }
        })
    }

exports.deleteTour = (req, res)=>{ 
        res.status(204).json({
            status:"success",
            data:null
        })
    }