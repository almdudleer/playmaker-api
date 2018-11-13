const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/users');
const Auth = require('../controllers/auth');

router.post('/signup', UserController.user_signup);

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log("successful");
    res.status(200).json({
        message:"successful"
    })
});

router.post('/logout', Auth.isLoggedIn, UserController.user_logout);

router.patch('/', Auth.isLoggedIn, UserController.user_update);

router.get('/roles', UserController.user_get_roles);

router.get('/eexists', UserController.user_email_exists);

router.get('/uexists', UserController.user_username_exists);

module.exports = router;
