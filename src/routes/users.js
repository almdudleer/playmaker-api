const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/users');
const Auth = require('../controllers/auth');
const multer = require('multer');

const upload = multer();

router.post('/signup', UserController.user_signup);

router.post('/login', Auth.isLoggedOut, passport.authenticate('local'), (req, res, next) => {
    console.log("successful");
    res.status(200).json({
        success: true,
        username: req.body.username
    })
});

router.post('/steam/delete', Auth.isLoggedIn, UserController.user_delete_openid);

router.get('/steam/add', passport.authenticate('steam'));

router.get('/steam/login', Auth.isLoggedOut, passport.authenticate('steam'));

router.get('/steam/login/return', passport.authenticate('steam', {failureRedirectL: '/login'}), (req, res, next) => {
    res.redirect(process.env.FRONTEND_URL);
});

router.post('/logout', Auth.isLoggedIn, UserController.user_logout);

router.get('/roles', UserController.user_get_roles);

router.get('/eexists', UserController.user_email_exists);

router.get('/uexists', UserController.user_username_exists);

router.patch('/', Auth.isLoggedIn, upload.any(), UserController.user_update);

router.get('/info/:username', UserController.user_get_info);

router.get('/avatar/:username', UserController.get_avatar);


router.get('/teams/:userId', UserController.user_get_teams);

router.get('/tournaments/:userId', UserController.user_get_tournaments);

router.get('/invites', Auth.isLoggedIn, UserController.user_get_invites);

router.get('/confirm/:key', UserController.user_confirm_email);

router.post('/fav/follow/:tournamentId', UserController.user_add_tournament);

router.post('/fav/unfollow/:tournamentId', UserController.user_delete_tournament);

router.post('/restorePass', UserController.user_restore_password);

router.post('/reset/:userRestoreKey', UserController.user_confirm_restore);

router.post('/feedback', UserController.user_send_feedback);


module.exports = router;
