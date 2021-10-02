var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController');

module.exports = (upload) => {

    // router.post('/posts', upload.single('fileSrc'), postsController.post);

    router.post('/posts', upload.single('image'), postsController.post);

    router.post('/isPost', postsController.getAll);
    router.get('/posts/:id', postsController.get);
    router.put('/posts/:id', upload.single('image'), postsController.put);
    router.delete('/posts/:id', postsController.delete);

    router.post('/getFiltration', postsController.getFiltration);
    
    return router;
}


// module.exports = router;
