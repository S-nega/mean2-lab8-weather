// const http = require('http');
// const OpenApiValidator = require('express-openapi-validator'); 

var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const weatherRouter = require('./routes/api/weather')
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'lab8-weather/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //Разрешение на cors
// app.use(bodyParser.json());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', weatherRouter);



//mongoose connecting
mongoose.
connect('mongodb+srv://admin:admin@userslist.s6zf9e1.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
console.log('connected to MongoDB')
  }).catch((error) => {
    console.log(error)
})

//port connection
app.listen(3000, ()=>{
  console.log('listen port 3000')
});

module.exports = app;