/*global require, module exports */
const Tour = require('../models/tourModel');
exports.getOverview = (req, res) => {
  // 1) get tour data from collection

  // 2) Build a template

  // 3) render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker',
  });
};
