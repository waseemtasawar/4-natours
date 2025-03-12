/*global require, module */
const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/v1/tours/top-5-cheap:
 *   get:
 *     summary: Get top 5 cheapest tours
 *     description: Retrieves the top 5 cheapest tours available.
 *     responses:
 *       200:
 *         description: Successfully retrieved the tours.
 */
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

/**
 * @swagger
 * /api/v1/tours/tour-stats:
 *   get:
 *     summary: Get tour statistics
 *     description: Retrieve various statistics about the available tours.
 *     responses:
 *       200:
 *         description: Successfully retrieved tour statistics.
 */
router.route('/tour-stats').get(tourController.getTourStats);

/**
 * @swagger
 * /api/v1/tours/monthly-plan/{year}:
 *   get:
 *     summary: Get the monthly plan
 *     description: Retrieve the monthly plan for a specific year.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year for which the monthly plan is retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved the monthly plan.
 */
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

/**
 * @swagger
 * /api/v1/tours:
 *   get:
 *     summary: Get all tours
 *     description: Retrieve a list of all available tours.
 *     responses:
 *       200:
 *         description: Successfully retrieved all tours.
 *   post:
 *     summary: Add a new tour
 *     description: Create a new tour entry.
 *     responses:
 *       201:
 *         description: Tour created successfully.
 */
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.addTour);

/**
 * @swagger
 * /api/v1/tours/{id}:
 *   get:
 *     summary: Get a specific tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tour to retrieve.
 *     responses:
 *       200:
 *         description: Tour retrieved successfully.
 *       404:
 *         description: Tour not found.
 *   patch:
 *     summary: Update a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tour to update.
 *     responses:
 *       200:
 *         description: Tour updated successfully.
 *       404:
 *         description: Tour not found.
 *   delete:
 *     summary: Delete a tour by ID
 *     description: Deletes a tour only if the user is an admin or lead-guide.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tour to delete.
 *     responses:
 *       204:
 *         description: Tour deleted successfully.
 *       403:
 *         description: Forbidden - Not enough permissions.
 *       404:
 *         description: Tour not found.
 */
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
