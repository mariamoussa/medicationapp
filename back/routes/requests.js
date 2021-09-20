var express = require('express');
var router = express.Router();
var requestsController = require('../controllers/requestsController');

router.get('/requests', requestsController.getAll);
router.get('/requests/:id', requestsController.get);
router.post('/requests', requestsController.post);
router.put('/requests/:id', requestsController.put);
router.delete('/requests/:id', requestsController.delete);

router.get('/getByReceiverId/:userId', requestsController.getByReceiverId);
router.get('/getBySenderId/:userId', requestsController.getBySenderId);

module.exports = router;