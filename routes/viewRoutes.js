/*global require, module */
const viewController = require('./../controllers/viewController');
const express = require('express');
const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/tour', viewController.getTour);

module.exports = router;
