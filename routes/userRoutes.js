/*global require, module */
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Registers a new user with a name, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Users"
 *               email:
 *                 type: string
 *                 example: "users@gmail.com"
 *               password:
 *                 type: string
 *                 example: "pass12384"
 *               passwordConfirm:
 *                 type: string
 *                 example: "pass12384"
 *               role:
 *                 type: string
 *                 example: "guide"
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admintasawar0@gmail.com"
 *               password:
 *                 type: string
 *                 example: "pass123844"
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/v1/users/forgotPassword:
 *   post:
 *     summary: Forgot password
 *     description: Sends a password reset token to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admintasawar0@gmail.com"
 *     responses:
 *       200:
 *         description: Password reset token sent.
 *       404:
 *         description: User not found.
 */
router.post('/forgotPassword', authController.forgotPassword);

/**
 * @swagger
 * /api/v1/users/resetPassword/{token}:
 *   patch:
 *     summary: Reset user password
 *     description: Allows a user to reset their password using a reset token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token sent to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newpass"
 *               passwordConfirm:
 *                 type: string
 *                 example: "newpass"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid or expired token.
 */
router.patch('/resetPassword/:token', authController.resetPassword);

/**
 * @swagger
 * /api/v1/users/updateMyPassword:
 *   patch:
 *     summary: Update my password
 *     description: Allows an authenticated user to update their password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passwordCurrent:
 *                 type: string
 *                 example: "pass123844"
 *               password:
 *                 type: string
 *                 example: "pass1238444"
 *               passwordConfirm:
 *                 type: string
 *                 example: "pass1238444"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 */
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

/**
 * @swagger
 * /api/v1/users/updateMe:
 *   patch:
 *     summary: Update my profile
 *     description: Allows an authenticated user to update their profile.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "test2"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 */
router.patch('/updateMe', authController.protect, userController.updateMe);

/**
 * @swagger
 * /api/v1/users/deleteMe:
 *   delete:
 *     summary: Delete my account
 *     description: Allows an authenticated user to delete their account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Account deleted successfully.
 */
router.delete('/deleteMe', authController.protect, userController.deleteMe);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users.
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *   post:
 *     summary: Add a new user
 *     description: Creates a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New User"
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.route('/').get(userController.getAllUsers).post(userController.addUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       404:
 *         description: User not found.
 *   patch:
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 *   delete:
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
