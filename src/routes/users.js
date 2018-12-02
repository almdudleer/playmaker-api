const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/users');
const Auth = require('../controllers/auth');


// frontend implemented:
router.post('/signup', UserController.user_signup);

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log("successful");
    res.status(200).json({
        success: true,
        username: req.body.username
    })
});

router.post('/logout', Auth.isLoggedIn, UserController.user_logout);

router.get('/roles', UserController.user_get_roles);

router.get('/eexists', UserController.user_email_exists);

router.get('/uexists', UserController.user_username_exists);

// frontend not implemented:

router.patch('/', Auth.isLoggedIn, UserController.user_update);

router.get('/info/:username', UserController.user_get_info);

//Возвращает список команд, капитаном которых являетс текущий пользователь
router.get('/teams', Auth.isLoggedIn, UserController.user_get_teams);

router.get('/confirm/:key', UserController.user_confirm_email);

module.exports = router;
