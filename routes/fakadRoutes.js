const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
//const { validate } = require('../validators'); // Import custom validation middleware

// Import the fakadController to handle requests
const fakadController = require('../controllers/fakadController');

// Validation and sanitization middleware for create and update operations
const validateAndSanitizeFakad = [
  body('firstName').isString().trim().notEmpty(),
  body('middleName').optional().isString().trim(),
  body('lastName').isString().trim().notEmpty(),
  body('gender').isIn(['Male', 'Female']).notEmpty(),
  body('dateOfBirth').isISO8601().toDate().optional(),
  body('maritalStatus').isIn(['Single', 'Married', 'Divorced']).notEmpty(),
  body('phoneNumber').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('contactAddress').isString().trim().notEmpty(),
  body('occupation').isString().trim().notEmpty(),
  body('placeOfBirth').isString().trim().notEmpty(),
  body('stateOfOrigin').isString().trim().notEmpty(),
  body('localGovtArea').isString().trim().notEmpty(),
  body('homeTown').isString().trim().notEmpty(),
  body('villageAddress').isString().trim().notEmpty(),
  body('passportPhotograph').isString().notEmpty(),

  // Guardian specific fields
  body('guardian.firstName').isString().trim().notEmpty(),
  body('guardian.middleName').optional().isString().trim(),
  body('guardian.lastName').isString().trim().notEmpty(),
  body('guardian.gender').isIn(['Male', 'Female']).notEmpty(),
  body('guardian.maritalStatus').isIn(['Single', 'Married', 'Divorced']).notEmpty(),
  body('guardian.phoneNumber').isString().trim().notEmpty(),
  body('guardian.email').isEmail().normalizeEmail(),
  body('guardian.contactAddress').isString().trim().notEmpty(),
  body('guardian.occupation').isString().trim().notEmpty(),
  body('guardian.placeOfBirth').isString().trim().notEmpty(),
  body('guardian.stateOfOrigin').isString().trim().notEmpty(),
  body('guardian.localGovtArea').isString().trim().notEmpty(),
  body('guardian.homeTown').isString().trim().notEmpty(),
  body('guardian.villageAddress').isString().trim().notEmpty(),
  body('guardian.identificationType').isIn(['National ID', 'International Passport', "Voter's Card"]).notEmpty(),
  body('guardian.identificationUpload').isString().notEmpty(),

  // Next of Kin specific fields
  body('nextOfKin.firstName').isString().trim().notEmpty(),
  body('nextOfKin.middleName').optional().isString().trim(),
  body('nextOfKin.lastName').isString().trim().notEmpty(),
  body('nextOfKin.gender').isIn(['Male', 'Female']).notEmpty(),
  body('nextOfKin.maritalStatus').isIn(['Single', 'Married', 'Divorced']).notEmpty(),
  body('nextOfKin.relationship').isIn(['Brother', 'Sister', 'Mother', 'Father']).notEmpty(),
  body('nextOfKin.phoneNumber').isString().trim().notEmpty(),
  body('nextOfKin.email').isEmail().normalizeEmail(),
  body('nextOfKin.contactAddress').isString().trim().notEmpty(),
  body('nextOfKin.occupation').isString().trim().notEmpty(),
  body('nextOfKin.placeOfBirth').isString().trim().notEmpty(),
  body('nextOfKin.stateOfOrigin').isString().trim().notEmpty(),
  body('nextOfKin.localGovtArea').isString().trim().notEmpty(),
  body('nextOfKin.homeTown').isString().trim().notEmpty(),
  body('nextOfKin.villageAddress').isString().trim().notEmpty()
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

module.exports = router;