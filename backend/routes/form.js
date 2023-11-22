const express = require('express');

const router = express.Router();

const {acceptForm, getFormsData, acceptQuarterForm, getQuarterFormsData, getSubmissionCount2, getSubmissionCount1, deleteAllSubmission1, deleteAllSubmission2, getSubmissions1, getSubmissions2, deleteInForm1, deleteInForm2, fetchQuarterForm, form1PreSubmission, withdrawForm1, withdrawForm2}  = require('../controllers/formController');

const { isAuthenticatedUser } = require('../middleware/auth');
const { isAuthenticated } = require('../middleware/auth');

router.route('/user/form').post(isAuthenticatedUser,acceptForm);
router.route('/user/presubmissionform1').get(isAuthenticatedUser,form1PreSubmission);
router.route('/admin/formdata').get(isAuthenticated,getFormsData);
router.route('/user/quarterform').post(isAuthenticatedUser,acceptQuarterForm);
router.route('/user/quartersubmission').get(isAuthenticatedUser,fetchQuarterForm);
router.route('/admin/quarterformdata').get(isAuthenticated,getQuarterFormsData);
router.route('/admin/quartersubmissioncount').get(isAuthenticated,getSubmissionCount2);
router.route('/admin/submissioncount').get(isAuthenticated,getSubmissionCount1);
router.route('/admin/form1submissions').get(isAuthenticated,getSubmissions1);
router.route('/admin/form2submissions').get(isAuthenticated,getSubmissions2);
router.route('/admin/deleteall1').post(isAuthenticated,deleteAllSubmission1);
router.route('/admin/deleteall2').post(isAuthenticated,deleteAllSubmission2);
router.route('/admin/deleteIn1').post(isAuthenticated,deleteInForm1);
router.route('/user/withdrawform1').post(isAuthenticatedUser,withdrawForm1);
router.route('/user/withdrawform2').post(isAuthenticatedUser,withdrawForm2);
router.route('/admin/deleteIn2').post(isAuthenticated,deleteInForm2);

module.exports= router;