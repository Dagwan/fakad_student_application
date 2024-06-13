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
      firstName,
      middleName,
      lastName,
      gender,
      specifiedGender,
      occupation,
      position,
      officeAddress,
      headquartersLocation,
      subBusinessBranches,
      contactNumber,
      email,
      socialMediaHandles,
      passportPhotograph
    } = req.body;

    // Check if email already exists
    const existingFakad = await mongodb.getDb().db().collection('faka_info_techs').findOne({ email });
    if (existingFakad) {
      return res.status(400).json({ error: 'Email address is already in use.' });
    }

    // Create the new faka_info_tech
    const faka_info_tech = {
      firstName,
      middleName,
      lastName,
      gender,
      specifiedGender: gender === 'other' ? specifiedGender : undefined,
      occupation,
      position,
      officeAddress,
      headquartersLocation,
      subBusinessBranches,
      contactNumber,
      email,
      socialMediaHandles,
      passportPhotograph
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
      specifiedGender,
      occupation,
      position,
      officeAddress,
      headquartersLocation,
      subBusinessBranches,
      contactNumber,
      email,
      socialMediaHandles,
      passportPhotograph
    } = req.body;

    // Update the faka_info_tech
    const faka_info_tech = {
      _id: userId, // Ensure the _id field is preserved
      firstName,
      middleName,
      lastName,
      gender,
      specifiedGender: gender === 'other' ? specifiedGender : undefined,
      occupation,
      position,
      officeAddress,
      headquartersLocation,
      subBusinessBranches,
      contactNumber,
      email,
      socialMediaHandles,
      passportPhotograph
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('faka_info_techs')
      .replaceOne({ _id: userId }, faka_info_tech);

    if (response.modifiedCount > 0) {
      res.status(204).send(); // Successfully updated
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
      res.status(204).send();
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