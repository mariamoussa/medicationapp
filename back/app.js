
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//for upload image
var multer = require('multer')


require('dotenv').config();

var bodyParser = require("body-parser");

var mongoose = require('mongoose');

//for upload image
//multer
const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, './public/uploads'),
  filename: (req, file, cb) => {
    const date = Date.now();
    const image = date + path.extname(file.originalname)
    cb(null, image);
  }
})
const upload = multer({ storage: multerStorage });





// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://127.0.0.1:27017';
// const nameDB = 'medicationapp'

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var requestsRouter = require('./routes/requests');
var reportsRouter = require('./routes/reports');
var postsRouter = require('./routes/posts')(upload);
//here we added upload because this is where we need to upload image

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello Maria !!')
});

app.use(authRouter);
app.use(usersRouter);
app.use(requestsRouter);
app.use(reportsRouter);
app.use(postsRouter);

try {
  mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
} catch (e) {
  console.log(e)
}

// MongoClient.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (err, dataBase) => {
//   if (err) {
//     return console.log(err);
//   }
//   const db = dataBase.db(nameDB);
// console.log(`MongoDB Connected: ${url}`);
//   // console.log(db);
// });

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(err.message);
  res.send({ success: false, message: err.message })
});

module.exports = app;
