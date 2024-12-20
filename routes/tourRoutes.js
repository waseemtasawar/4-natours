/*global require,  module, */
const express = require('express')
// import express from 'express'
const tourController = require('./../controllers/tourController')

const router = express.Router()


// router.param('id', tourController.checkId)


router.route('/').get(tourController.getAllTours)
.post(tourController.addTour)

router.route('/:id').get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router
