var express = require('express');
var router = express.Router();
var reportsController = require('../controllers/reportsController');

router.get('/allReports', reportsController.getAll);
router.post('/report', reportsController.post);
router.post('/getUserReports', reportsController.getByUser);

module.exports = router;