const mongodb = require('../db/db');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create a new contact us entry
const createContactUs = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    // Create the new contact us entry
    const contactUsEntry = {
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date()
    };

    const response = await mongodb.getDb().db().collection('contact_us').insertOne(contactUsEntry);

    if (response.acknowledged) {
      res.status(201).json({ success: 'Contact Us entry created successfully', contactUsId: response.insertedId });
    } else {
      res.status(500).json({ error: 'Error occurred while creating the Contact Us entry.' });
    }
  } catch (error) {
    console.error('Error creating a Contact Us entry:', error);
    res.status(500).json({ error: 'An error occurred while creating the Contact Us entry.' });
  }
};

// Get all contact us entries
const getAllContactUs = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contact_us').find();
    const contactUsEntries = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contactUsEntries);
  } catch (error) {
    console.error('Error fetching all Contact Us entries:', error);
    res.status(500).json({ error: 'An error occurred while fetching all Contact Us entries.' });
  }
};

// Get a single contact us entry by ID
const getSingleContactUs = async (req, res) => {
  try {
    const contactUsId = req.params.id;

    if (!ObjectId.isValid(contactUsId)) {
      return res.status(400).json({ error: 'Invalid Contact Us entry ID format.' });
    }

    const contactUsEntry = await mongodb
      .getDb()
      .db()
      .collection('contact_us')
      .findOne({ _id: new ObjectId(contactUsId) });

    if (!contactUsEntry) {
      return res.status(404).json({ error: 'Contact Us entry not found.' });
    }

    res.status(200).json(contactUsEntry);
  } catch (error) {
    console.error('Error fetching a single Contact Us entry by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the Contact Us entry.' });
  }
};

// Update an existing contact us entry by ID
const updateContactUs = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactUsId = new ObjectId(req.params.id);
    const { name, email, phone, subject, message } = req.body;

    // Update the contact us entry
    const contactUsEntry = {
      name,
      email,
      phone,
      subject,
      message,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contact_us')
      .replaceOne({ _id: contactUsId }, contactUsEntry);

    if (response.modifiedCount > 0) {
      res.status(200).json({ success: 'Contact Us entry successfully updated', contactUsId });
    } else {
      res.status(404).json({ error: 'Contact Us entry not found.' });
    }
  } catch (error) {
    console.error('Error updating a Contact Us entry by ID:', error);
    res.status(500).json({ error: 'An error occurred while updating the Contact Us entry.' });
  }
};

// Delete a contact us entry by ID
const deleteContactUs = async (req, res) => {
  try {
    const contactUsId = new ObjectId(req.params.id);

    const contactUsExists = await mongodb.getDb().db().collection('contact_us').findOne({ _id: contactUsId });

    if (!contactUsExists) {
      return res.status(404).json({ error: 'Contact Us entry not found.' });
    }

    const response = await mongodb.getDb().db().collection('contact_us').deleteOne({ _id: contactUsId });

    if (response.deletedCount > 0) {
      res.status(200).json({ success: 'Contact Us entry successfully deleted', contactUsId });
    } else {
      res.status(500).json({ error: 'Error occurred while deleting the Contact Us entry.' });
    }
  } catch (error) {
    console.error('Error deleting a Contact Us entry by ID:', error);
    res.status(500).json({ error: 'An error occurred while deleting the Contact Us entry.' });
  }
};

module.exports = {
  createContactUs,
  getAllContactUs,
  getSingleContactUs,
  updateContactUs,
  deleteContactUs
};
