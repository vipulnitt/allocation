const express = require('express');

const router = express.Router();

const {acceptForm, getFormsData, acceptQuarterForm, getQuarterFormsData}  = require('../controllers/formController');

const { isAuthenticatedUser } = require('../middleware/auth');
const { isAuthenticated } = require('../middleware/auth');

router.route('/user/form').post(isAuthenticatedUser,acceptForm);
router.route('/admin/formdata').get(isAuthenticated,getFormsData);
router.route('/user/quarterform').post(isAuthenticatedUser,acceptQuarterForm);
router.route('/admin/quarterformdata').get(isAuthenticated,getQuarterFormsData);
module.exports= router;