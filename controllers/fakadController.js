const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create a new faka_info_tech
const createFakad = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      // Student Information
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      maritalStatus,
      phoneNumber,
      email,
      contactAddress,
      occupation,
      placeOfBirth,
      stateOfOrigin,
      localGovtArea,
      homeTown,
      villageAddress,
      previousTraining,
      previousTrainingDetails,
      choiceOfTrainingProgramme,
      passportPhotograph,
      // Guardian Information
      guardian: {
        firstName: guardianFirstName,
        middleName: guardianMiddleName,
        lastName: guardianLastName,
        gender: guardianGender,
        maritalStatus: guardianMaritalStatus,
        phoneNumber: guardianPhoneNumber,
        email: guardianEmail,
        contactAddress: guardianContactAddress,
        occupation: guardianOccupation,
        placeOfBirth: guardianPlaceOfBirth,
        stateOfOrigin: guardianStateOfOrigin,
        localGovtArea: guardianLocalGovtArea,
        homeTown: guardianHomeTown,
        villageAddress: guardianVillageAddress,
        identificationType: guardianIdentificationType,
        identificationUpload: guardianIdentificationUpload,
        passportPhotograph: guardianPassportPhotograph
      },
      // Next of Kin Information
      nextOfKin: {
        firstName: nextOfKinFirstName,
        middleName: nextOfKinMiddleName,
        lastName: nextOfKinLastName,
        gender: nextOfKinGender,
        maritalStatus: nextOfKinMaritalStatus,
        relationship: nextOfKinRelationship,
        phoneNumber: nextOfKinPhoneNumber,
        email: nextOfKinEmail,
        contactAddress: nextOfKinContactAddress,
        occupation: nextOfKinOccupation,
        placeOfBirth: nextOfKinPlaceOfBirth,
        stateOfOrigin: nextOfKinStateOfOrigin,
        localGovtArea: nextOfKinLocalGovtArea,
        homeTown: nextOfKinHomeTown,
        villageAddress: nextOfKinVillageAddress
      }
    } = req.body;

    // Check if first name or email already exists
    const existingFakad = await mongodb.getDb().db().collection('faka_info_techs').findOne({ 
      $or: [
        { firstName: firstName },
        { email: email }
      ]
    });

    if (existingFakad) {
      return res.status(400).json({ error: 'First name or Email address is already in use.' });
    }

    // Create the new faka_info_tech
    const faka_info_tech = {
      // Student Information
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      maritalStatus,
      phoneNumber,
      email,
      contactAddress,
      occupation,
      placeOfBirth,
      stateOfOrigin,
      localGovtArea,
      homeTown,
      villageAddress,
      previousTraining,
      previousTrainingDetails,
      choiceOfTrainingProgramme,
      passportPhotograph,
      // Guardian Information
      guardian: {
        firstName: guardianFirstName,
        middleName: guardianMiddleName,
        lastName: guardianLastName,
        gender: guardianGender,
        maritalStatus: guardianMaritalStatus,
        phoneNumber: guardianPhoneNumber,
        email: guardianEmail,
        contactAddress: guardianContactAddress,
        occupation: guardianOccupation,
        placeOfBirth: guardianPlaceOfBirth,
        stateOfOrigin: guardianStateOfOrigin,
        localGovtArea: guardianLocalGovtArea,
        homeTown: guardianHomeTown,
        villageAddress: guardianVillageAddress,
        identificationType: guardianIdentificationType,
        identificationUpload: guardianIdentificationUpload,
        passportPhotograph: guardianPassportPhotograph
      },
      // Next of Kin Information
      nextOfKin: {
        firstName: nextOfKinFirstName,
        middleName: nextOfKinMiddleName,
        lastName: nextOfKinLastName,
        gender: nextOfKinGender,
        maritalStatus: nextOfKinMaritalStatus,
        relationship: nextOfKinRelationship,
        phoneNumber: nextOfKinPhoneNumber,
        email: nextOfKinEmail,
        contactAddress: nextOfKinContactAddress,
        occupation: nextOfKinOccupation,
        placeOfBirth: nextOfKinPlaceOfBirth,
        stateOfOrigin: nextOfKinStateOfOrigin,
        localGovtArea: nextOfKinLocalGovtArea,
        homeTown: nextOfKinHomeTown,
        villageAddress: nextOfKinVillageAddress
      }
    };

    const response = await mongodb.getDb().db().collection('faka_info_techs').insertOne(faka_info_tech);

    if (response.acknowledged) {
      res.status(201).json({ success: 'Fakad created successfully', fakadId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Error occurred while creating the faka_info_tech.' });
    }
  } catch (error) {
    console.error('Error creating a faka_info_tech:', error);
    res.status(500).json({ error: 'An error occurred while creating the faka_info_tech.' });
  }
};


// Get all faka_info_techs
const getAllFakads = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('faka_info_techs').find();
    const faka_info_techs = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(faka_info_techs);
  } catch (error) {
    console.error('Error fetching all faka_info_techs:', error);
    res.status(500).json({ error: 'An error occurred while fetching all faka_info_techs.' });
  }
};

// Get a single faka_info_tech by ID
const getSingleFakad = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid faka_info_tech ID format.' });
    }

    const faka_info_tech = await mongodb
      .getDb()
      .db()
      .collection('faka_info_techs')
      .findOne({ _id: new ObjectId(userId) });

    if (!faka_info_tech) {
      return res.status(404).json({ error: 'Fakad not found.' });
    }

    res.status(200).json(faka_info_tech);
  } catch (error) {
    console.error('Error fetching a single faka_info_tech by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the faka_info_tech.' });
  }
};

// Update an existing faka_info_tech by ID
const updateFakad = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = new ObjectId(req.params.id);
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      maritalStatus,
      phoneNumber,
      email,
      contactAddress,
      occupation,
      placeOfBirth,
      stateOfOrigin,
      localGovtArea,
      homeTown,
      villageAddress,
      previousTraining,
      previousTrainingDetails,
      choiceOfTrainingProgramme,
      passportPhotograph,
      // Guardian Information
      guardian: {
        firstName: guardianFirstName,
        middleName: guardianMiddleName,
        lastName: guardianLastName,
        gender: guardianGender,
        maritalStatus: guardianMaritalStatus,
        phoneNumber: guardianPhoneNumber,
        email: guardianEmail,
        contactAddress: guardianContactAddress,
        occupation: guardianOccupation,
        placeOfBirth: guardianPlaceOfBirth,
        stateOfOrigin: guardianStateOfOrigin,
        localGovtArea: guardianLocalGovtArea,
        homeTown: guardianHomeTown,
        villageAddress: guardianVillageAddress,
        identificationType: guardianIdentificationType,
        identificationUpload: guardianIdentificationUpload,
        passportPhotograph: guardianPassportPhotograph
      },
      // Next of Kin Information
      nextOfKin: {
        firstName: nextOfKinFirstName,
        middleName: nextOfKinMiddleName,
        lastName: nextOfKinLastName,
        gender: nextOfKinGender,
        maritalStatus: nextOfKinMaritalStatus,
        relationship: nextOfKinRelationship,
        phoneNumber: nextOfKinPhoneNumber,
        email: nextOfKinEmail,
        contactAddress: nextOfKinContactAddress,
        occupation: nextOfKinOccupation,
        placeOfBirth: nextOfKinPlaceOfBirth,
        stateOfOrigin: nextOfKinStateOfOrigin,
        localGovtArea: nextOfKinLocalGovtArea,
        homeTown: nextOfKinHomeTown,
        villageAddress: nextOfKinVillageAddress
      }
    } = req.body;

    // Update the faka_info_tech
    const faka_info_tech = {
      _id: userId, // Ensure the _id field is preserved
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      maritalStatus,
      phoneNumber,
      email,
      contactAddress,
      occupation,
      placeOfBirth,
      stateOfOrigin,
      localGovtArea,
      homeTown,
      villageAddress,
      previousTraining,
      previousTrainingDetails,
      choiceOfTrainingProgramme,
      passportPhotograph,
      // Guardian Information
      guardian: {
        firstName: guardianFirstName,
        middleName: guardianMiddleName,
        lastName: guardianLastName,
        gender: guardianGender,
        maritalStatus: guardianMaritalStatus,
        phoneNumber: guardianPhoneNumber,
        email: guardianEmail,
        contactAddress: guardianContactAddress,
        occupation: guardianOccupation,
        placeOfBirth: guardianPlaceOfBirth,
        stateOfOrigin: guardianStateOfOrigin,
        localGovtArea: guardianLocalGovtArea,
        homeTown: guardianHomeTown,
        villageAddress: guardianVillageAddress,
        identificationType: guardianIdentificationType,
        identificationUpload: guardianIdentificationUpload,
        passportPhotograph: guardianPassportPhotograph
      },
      // Next of Kin Information
      nextOfKin: {
        firstName: nextOfKinFirstName,
        middleName: nextOfKinMiddleName,
        lastName: nextOfKinLastName,
        gender: nextOfKinGender,
        maritalStatus: nextOfKinMaritalStatus,
        relationship: nextOfKinRelationship,
        phoneNumber: nextOfKinPhoneNumber,
        email: nextOfKinEmail,
        contactAddress: nextOfKinContactAddress,
        occupation: nextOfKinOccupation,
        placeOfBirth: nextOfKinPlaceOfBirth,
        stateOfOrigin: nextOfKinStateOfOrigin,
        localGovtArea: nextOfKinLocalGovtArea,
        homeTown: nextOfKinHomeTown,
        villageAddress: nextOfKinVillageAddress
      }
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('faka_info_techs')
      .replaceOne({ _id: userId }, faka_info_tech);

    if (response.modifiedCount > 0) {
      res.status(201).json({ success: 'Fakad successfully updated', fakadId: response.insertedId }); // Successfully updated
    } else {
      res.status(404).json({ error: 'Fakad not found.' }); // Document not found
    }
  } catch (error) {
    console.error('Error updating a faka_info_tech by ID:', error);
    res.status(500).json({ error: 'An error occurred while updating the faka_info_tech.' });
  }
};

// Delete a faka_info_tech by ID
const deleteFakad = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const fakadExists = await mongodb.getDb().db().collection('faka_info_techs').findOne({ _id: userId });

    if (!fakadExists) {
      return res.status(404).json({ error: 'Fakad not found.' });
    }

    const response = await mongodb.getDb().db().collection('faka_info_techs').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(201).json({ success: 'Fakad successfully deleted', fakadId: response.insertedId }); // Success deleted
    } else {
      res.status(500).json({ error: 'Error occurred while deleting the faka_info_tech.' });
    }
  } catch (error) {
    console.error('Error deleting a faka_info_tech by ID:', error);
    res.status(500).json({ error: 'An error occurred while deleting the faka_info_tech.' });
  }
};

module.exports = {
  createFakad,
  getAllFakads,
  getSingleFakad,
  updateFakad,
  deleteFakad
};