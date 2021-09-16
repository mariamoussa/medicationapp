var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController');


router.get('/', postsController.getAll);
router.get('/:id', postsController.get);
router.put('/:id', postsController.put);
router.delete('/:id', postsController.delete);

module.exports = router;
