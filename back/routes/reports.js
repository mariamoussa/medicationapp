var express = require('express');
var router = express.Router();
var reportsController = require('../controllers/reportsController');

router.get('/allReports', reportsController.getAll);
router.post('/report', reportsController.post);
router.delete('/report/:maria', reportsController.delete);
router.post('/getUserReports', reportsController.getByUser);
router.get('/getReportsCount', reportsController.getReportsCount);

module.exports = router;