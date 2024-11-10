const express = require('express');
const router = express.Router();

const { listTransaction } = require('../controllers/TransactionController');
const { getStatistics } = require('../controllers/StatsContollers');
const { getBarChartData } = require('../controllers/ChartController');
const { getCombinedData } = require('../controllers/CombinedController');

// routes for each endpoint

router.get('/transactions', listTransaction);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChartData);
router.get('/combined', getCombinedData);

module.exports = router;
