const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import the fakadController to handle requests
const fakadController = require('../controllers/fakadController');

// Validation and sanitization middleware for create and update operations
const validateAndSanitizeFakad = [
  body('firstName').isString().trim().notEmpty(),
  body('middleName').optional().isString().trim(),
  body('lastName').isString().trim().notEmpty(),
  body('gender').isIn(['Male', 'Female', 'Other']).notEmpty(),
  body('specifiedGender').if(body('gender').equals('other')).isString().trim().notEmpty(),
  body('occupation').isString().trim().notEmpty(),
  body('position').isString().trim().notEmpty(),
  body('officeAddress').isString().trim().notEmpty(),
  body('headquartersLocation').isString().trim().notEmpty(),
  body('subBusinessBranches').isArray().notEmpty(),
  body('contactNumber').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('socialMediaHandles').isObject().notEmpty(),
  body('passportPhotograph').isString().notEmpty(),
];

// Define the API routes and their corresponding controller methods

// Create a new fakad
router.post('/', validateAndSanitizeFakad, fakadController.createFakad);

// Get all fakads
router.get('/', fakadController.getAllFakads);

// Get a single fakad by ID
router.get('/:id', fakadController.getSingleFakad);

// Update fakad by ID
router.put('/:id', validateAndSanitizeFakad, fakadController.updateFakad);

// Delete fakad by ID
router.delete('/:id', fakadController.deleteFakad);

// Export the Router
module.exports = router;