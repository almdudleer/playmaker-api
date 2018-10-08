const express = require('express');
const router = express.Router();

// Удобно, пишешь нужный контроллер и нужный метод,
// Иван с Александром смотрят
router.get('/:id', require("../controllers/users").user_get_info);

module.exports = router;
