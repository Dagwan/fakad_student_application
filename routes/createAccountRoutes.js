const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const createAccountController = require('../controllers/createAccountController');
const authMiddleware = require('../middleware/authMiddleware');

// Validation and sanitization middleware for the create account form
const validateAndSanitizeCreateAccount = [
  body('fullName').isString().trim().notEmpty().withMessage('Full Name is required'),
  body('username').isString().trim().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').isString().trim().notEmpty().withMessage('Phone number is required'),
  body('dob').isISO8601().toDate().withMessage('Invalid date of birth format'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
  body('terms').isBoolean().withMessage('Terms acceptance must be boolean'),
  body('privacy').isBoolean().withMessage('Privacy acceptance must be boolean')
];

// Validation for login
const validateLogin = [
  body('username').isString().trim().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is required')
];

// Validation for forgot password
const validateForgotPassword = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
];

// Validation for reset password
const validateResetPassword = [
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];

// Create a new account (public, no authentication needed)
router.post('/', validateAndSanitizeCreateAccount, createAccountController.createAccount);

// User login (public, no authentication needed)
router.post('/login', validateLogin, createAccountController.login);

// Request password reset (public, no authentication needed)
router.post('/forgot-password', validateForgotPassword, createAccountController.forgotPassword);

// Reset password using token (public, no authentication needed)
router.post('/reset-password/:token', validateResetPassword, createAccountController.resetPassword);

// Get all account entries (authenticated)
router.get('/', authMiddleware, createAccountController.getAllAccounts);

// Get a single account entry by ID (authenticated)
router.get('/:id', authMiddleware, createAccountController.getSingleAccount);

// Update account entry by ID (authenticated)
router.put('/:id', authMiddleware, validateAndSanitizeCreateAccount, createAccountController.updateAccount);

// Delete account entry by ID (authenticated)
router.delete('/:id', authMiddleware, createAccountController.deleteAccount);

module.exports = router;