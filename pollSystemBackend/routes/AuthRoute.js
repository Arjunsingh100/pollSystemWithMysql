const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../Controllers/authController.js');

//register Route
router.post('/register', registerController);
//login Route
router.post('/login', loginController)


module.exports = router;