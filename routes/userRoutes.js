const express = require('express')

const router = express.Router()

const  getAllUsers = (req, res)=>{
    res.status(500).json({
        status: 'fail',
        message:'route cannot define yet'
    })
}

const  addUser = (req, res)=>{
    res.status(500).json({
        status: 'fail',
        message:'route cannot define yet'
    })
}
const  getUser = (req, res)=>{
    res.status(500).json({
        status: 'fail',
        message:'route cannot define yet'
    })
}
const  updateUser = (req, res)=>{
    res.status(500).json({
        status: 'fail',
        message:'route cannot define yet'
    })
}
const  deleteUser = (req, res)=>{
    res.status(500).json({
        status: 'fail',
        message:'route cannot define yet'
    })
}

router.route('/').get(getAllUsers).post(addUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


module.exports = router