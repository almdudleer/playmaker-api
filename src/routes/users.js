const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.patch('/', UserController.user_update);


module.exports = router;
