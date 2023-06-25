const express = require('express');

const router = express.Router();

const {addNorms, fetchNorms, addQuarterDetails, fetchQuarter, modifyTime}  = require('../controllers/FormDetailsController');

const { isAuthenticated } = require('../middleware/auth');

router.route('/addnorms').put(isAuthenticated,addNorms);
router.route('/form/modifytime').put(isAuthenticated,modifyTime);
router.route('/fetchnorms').get(fetchNorms);
router.route('/addquarterDetails').put(isAuthenticated,addQuarterDetails);
router.route('/fetchquarterDetails').get(fetchQuarter);
module.exports= router;