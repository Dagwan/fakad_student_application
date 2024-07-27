const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongodb = require('../db/db');
const { validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create a new account entry
const createAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, username, password, confirmPassword, email, phone, dob, gender, terms, privacy } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Check if username or email already exists
    const existingUser = await mongodb.getDb().db().collection('create_account').findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new account entry object with hashed password
    const accountEntry = {
      fullName,
      username,
      password: hashedPassword,
      email,
      phone,
      dob,
      gender,
      terms,
      privacy,
      createdAt: new Date()
    };

    // Insert the new account entry into the 'create_account' collection
    const response = await mongodb.getDb().db().collection('create_account').insertOne(accountEntry);

    if (response.acknowledged) {
      // Generate JWT token
      const tokenPayload = {
        accountId: response.insertedId,
        username: accountEntry.username,
      };

      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send a welcome email (Optional, comment out for debugging)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Fakad Infotech!',
        text: `Hello ${fullName},\n\nThank you for creating an account with Fakad Infotech. Your account has been successfully created.\n\nBest regards,\nFakad Infotech Team`,
        html: `<p>Hello ${fullName},</p><p>Thank you for creating an account with Fakad Infotech. Your account has been successfully created.</p><p>Best regards,<br>Fakad Infotech Team</p>`
      };

      // Uncomment this line in production
      // await transporter.sendMail(mailOptions);

      // Respond with the token along with the account creation success message
      res.status(201).json({ success: 'Account created successfully', accessToken });
    } else {
      res.status(500).json({ error: 'Error occurred while creating the account.' });
    }
  } catch (error) {
    console.error('Error creating an account:', error);
    res.status(500).json({ error: 'An error occurred while creating the account.' });
  }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('create_account').find();
    const accountEntries = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(accountEntries); 
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    res.status(500).json({ error: 'An error occurred while fetching all accounts.' });
  }
};


// Get a single account entry by ID
const getSingleAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    if (!ObjectId.isValid(accountId)) {
      return res.status(400).json({ error: 'Invalid account ID format.' });
    }

    const accountEntry = await mongodb
      .getDb()
      .db()
      .collection('create_account')
      .findOne({ _id: new ObjectId(accountId) });

    if (!accountEntry) {
      return res.status(404).json({ error: 'Account entry not found.' });
    }

    res.status(200).json(accountEntry);
  } catch (error) {
    console.error('Error fetching a single account by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the account.' });
  }
};

// Update an existing account entry by ID
const updateAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountId = new ObjectId(req.params.id);
    const { fullName, username, password, confirmPassword, email, phone, dob, gender, terms, privacy } = req.body;

    // Check if passwords match
    if (password && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Retrieve the existing account data
    const existingAccount = await mongodb.getDb().db().collection('create_account').findOne({ _id: accountId });

    if (!existingAccount) {
      return res.status(404).json({ error: 'Account entry not found.' });
    }

    // Check if there are any changes
    const isSameData = (
      fullName === existingAccount.fullName &&
      username === existingAccount.username &&
      email === existingAccount.email &&
      phone === existingAccount.phone &&
      dob === existingAccount.dob &&
      gender === existingAccount.gender &&
      terms === existingAccount.terms &&
      privacy === existingAccount.privacy &&
      (!password || await bcrypt.compare(password, existingAccount.password))
    );

    if (isSameData) {
      return res.status(400).json({ error: 'No changes detected. Account already updated.' });
    }

    // Hash the password if it's provided for update
    let hashedPassword = existingAccount.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the account entry
    const accountEntry = {
      fullName,
      username,
      password: hashedPassword,
      email,
      phone,
      dob,
      gender,
      terms,
      privacy,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('create_account')
      .replaceOne({ _id: accountId }, accountEntry);

    if (response.modifiedCount > 0) {
      res.status(200).json({ success: 'Account entry successfully updated', accountId });
    } else {
      res.status(500).json({ error: 'Error occurred while updating the account.' });
    }
  } catch (error) {
    console.error('Error updating an account by ID:', error);
    res.status(500).json({ error: 'An error occurred while updating the account.' });
  }
};

// Delete an account entry by ID
const deleteAccount = async (req, res) => {
  try {
    const accountId = new ObjectId(req.params.id);

    const accountExists = await mongodb.getDb().db().collection('create_account').findOne({ _id: accountId });

    if (!accountExists) {
      return res.status(404).json({ error: 'Account entry not found.' });
    }

    const response = await mongodb.getDb().db().collection('create_account').deleteOne({ _id: accountId });

    if (response.deletedCount > 0) {
      res.status(200).json({ success: 'Account entry successfully deleted', accountId });
    } else {
      res.status(500).json({ error: 'Error occurred while deleting the account entry.' });
    }
  } catch (error) {
    console.error('Error deleting an account by ID:', error);
    res.status(500).json({ error: 'An error occurred while deleting the account entry.' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Find user by username
    const user = await mongodb.getDb().db().collection('create_account').findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const tokenPayload = {
      accountId: user._id,
      username: user.username,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: 'Login successful', accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

// Request password reset
const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Find user by email
    const user = await mongodb.getDb().db().collection('create_account').findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email address' });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    await mongodb.getDb().db().collection('create_account').updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiry } }
    );

    // Send reset token via email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `Please use the following token to reset your password: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: 'Password reset token sent to email' });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ error: 'An error occurred while requesting password reset' });
  }
};

// Reset password using token
const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    // Find user by reset token
    const user = await mongodb.getDb().db().collection('create_account').findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await mongodb.getDb().db().collection('create_account').updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword }, $unset: { resetToken: '', resetTokenExpiry: '' } }
    );

    res.status(200).json({ success: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting the password' });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getSingleAccount,
  updateAccount,
  deleteAccount,
  login,
  forgotPassword,
  resetPassword,
};