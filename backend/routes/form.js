const express = require('express');

const router = express.Router();

const {acceptForm, getFormsData, acceptQuarterForm, getQuarterFormsData, getSubmissionCount2, getSubmissionCount1, deleteAllSubmission1, deleteAllSubmission2}  = require('../controllers/formController');

const { isAuthenticatedUser } = require('../middleware/auth');
const { isAuthenticated } = require('../middleware/auth');

router.route('/user/form').post(isAuthenticatedUser,acceptForm);
router.route('/admin/formdata').get(isAuthenticated,getFormsData);
router.route('/user/quarterform').post(isAuthenticatedUser,acceptQuarterForm);
router.route('/admin/quarterformdata').get(isAuthenticated,getQuarterFormsData);
router.route('/admin/quartersubmissioncount').get(isAuthenticated,getSubmissionCount2);
router.route('/admin/submissioncount').get(isAuthenticated,getSubmissionCount1);
router.route('/admin/deleteall1').get(isAuthenticated,deleteAllSubmission1);
router.route('/admin/deleteall2').get(isAuthenticated,deleteAllSubmission2);
module.exports= router;