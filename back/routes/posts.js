var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController');


router.post('/isPost', postsController.getAll);
router.get('/posts/:id', postsController.get);
router.post('/posts', postsController.post);
router.put('/posts/:id', postsController.put);
router.delete('/posts/:id', postsController.delete);


module.exports = router;
