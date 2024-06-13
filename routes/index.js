const express = require('express');
const router = express.Router();

// Include the Swagger documentation route
router.use('/', require('./swagger'));

// Include the fakad routes
router.use('/', require('./fakadRoutes'));

module.exports = router;
