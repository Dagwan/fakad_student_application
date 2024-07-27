const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactUsController = require('../controllers/contactUsController');

// Validation and sanitization middleware for the contact form
const validateAndSanitizeContactUs = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').isString().trim().notEmpty().withMessage('Phone number is required'),
  body('subject').isString().trim().notEmpty().withMessage('Subject is required'),
  body('message').isString().trim().notEmpty().withMessage('Message is required')
];

// Define the API routes and their corresponding controller methods

// Create a new contact us entry
router.post('/', validateAndSanitizeContactUs, contactUsController.createContactUs);

// Get all contact us entries
router.get('/', contactUsController.getAllContactUs);

// Get a single contact us entry by ID
router.get('/:id', contactUsController.getSingleContactUs);

// Update contact us entry by ID
router.put('/:id', validateAndSanitizeContactUs, contactUsController.updateContactUs);

// Delete contact us entry by ID
router.delete('/:id', contactUsController.deleteContactUs);

module.exports = router;
