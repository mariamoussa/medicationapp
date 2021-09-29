var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController');

// const multer = require('multer');
// const path = require('path');

// const multerStorage = multer.diskStorage({
//     destination: path.join(__dirname, '../public/uploads'),
//     filename: (res, file, cb) => {
//         const { fieldname, originalname } = file;
//         const date = Date.now();
//         const filename = `img-${date}-${originalname}`;
//         cb(null, filename)
//     }
// });

// const upload = multer({ storage: multerStorage })

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
