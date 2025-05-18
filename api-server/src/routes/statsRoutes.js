
const express = require('express');
const router = express.Router();
const { getLatestStats,  getPriceDeviation } = require('../controllers/statsController');

router.get('/stats', getLatestStats);
router.get('/deviation', getPriceDeviation); 

module.exports = router;
