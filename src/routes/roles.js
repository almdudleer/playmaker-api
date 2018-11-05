const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/roles');

router.get('/', RolesController.get);

module.exports = router;