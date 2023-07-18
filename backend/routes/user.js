const express = require('express');

const router = express.Router();

const {login, otpVerify, getCurrentProfile, logoutUser}  = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');
router.route('/user/login').post(login);

router.route('/user/verifyOtp').post(otpVerify);
router.route('/user/profile').post(isAuthenticatedUser,getCurrentProfile);
router.route('/user/logout').post(isAuthenticatedUser,logoutUser);
module.exports= router;