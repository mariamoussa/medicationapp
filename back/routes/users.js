var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.get);
router.put('/users/:id', usersController.put);
router.delete('/users/:id', usersController.delete);

router.post('/isphone', usersController.isValidPhone);
router.post('/isemail', usersController.isValidEmail);
router.post('/isusername', usersController.isValidUsername);

module.exports = router;