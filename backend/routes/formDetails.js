const express = require('express');

const router = express.Router();

const {addNorms, fetchNorms, addQuarterDetails, fetchQuarter, modifyTime, modifyTime2}  = require('../controllers/FormDetailsController');

const { isAuthenticated } = require('../middleware/auth');

router.route('/addnorms').put(isAuthenticated,addNorms);
router.route('/form/modifytime').put(isAuthenticated,modifyTime);
router.route('/fetchnorms').get(fetchNorms);
router.route('/addquarterDetails').put(isAuthenticated,addQuarterDetails);
router.route('/form/modifytime2').put(isAuthenticated,modifyTime2);
router.route('/fetchquarterDetails').get(fetchQuarter);
module.exports= router;