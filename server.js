
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
//var methodOverride = require('method-override');

var databaseConfig= require('./config/database');
var router = require('./app/models/routes');

mongoose.connect(databaseConfig.url);

app.listen(process.env.PORT || 30001);
console.log("App listening on port " + process.env.PORT);

app.use(bodyParser.urlencoded({ extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); //Log requests to API using morgan
//app.use(methodOverride());
app.use(cors());

router(app);

/*WATSON DISCOVERY*/

