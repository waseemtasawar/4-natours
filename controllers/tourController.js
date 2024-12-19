/*global require, , exports, */
// const tours = JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const Tour = require('./../models/tourModel')

// exports.checkId = (req, res, next, val)=>{
//       console.log(`The Tour Id is ${val}`)
//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status:"fail",
//             message:"Invalid ID"
//         })
//     }
//     next()
// }

// exports.checkbody = (req, res, next)=>{
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status:"fail",
//             message:"The Name or Price is Missing"
//         })
//     }
//     next()
// }

exports.getAllTours = async (req, res)=>{

    try {
        // Build the query
        // 1A) Filtring
        const queryObj = {...req.query}
        const excludedField =['page','sort','limit','fields'];
        excludedField.forEach(el=> delete queryObj[el])
        // 1B) Advance Filtring
        let queryStr = JSON.stringify(queryObj)
        queryStr =queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
        
        let query =  Tour.find(JSON.parse(queryStr))
        // 2)Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        }else{
            query= query.sort('-createdAt')
        }
        // 2)filed Limit
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }else{
            query= query.select('-__v')
        }


        // Excuite the Query
        const tours = await query

        // Send Response
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data:{
                tours
            }
        })
        
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getTour = async (req, res)=>{
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data:{
                tour
            }
        })
        
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        }) 
    }
};

exports.addTour = async (req, res)=>{
    try {
        const newTour = await Tour.create(req.body)
         res.status(201).json({
             status:'success',
             data:{
                 tours: newTour
             }
         })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error
        })
    }
 }


exports.updateTour = async (req, res)=>{   
    try {
      const tour =  await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        
        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error
        })
    }
    }

exports.deleteTour = async (req, res)=>{ 
    try {
        
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error
        })
        
    }  
    }
